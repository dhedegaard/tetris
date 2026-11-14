import { useCallback, useEffect, useRef } from 'react'
import { attemptToDoMove, moveGoToBottom, startNewGame } from '../store/actions/game'
import { selectCurrentShape } from '../store/slices/shape'
import { tetrisStore, useTetrisStore } from '../store/tetris'

interface Keybinds {
  moveLeft: string
  moveRight: string
  rotate: string
  moveDown: string
  goToBottom: string
  newGame: string
}

const keyboard1: Keybinds = {
  moveLeft: 'ArrowLeft',
  moveRight: 'ArrowRight',
  rotate: 'ArrowUp',
  moveDown: 'ArrowDown',
  goToBottom: ' ',
  newGame: 'r',
}
const keybinds = keyboard1
const handledKeys = new Set(Object.values(keybinds))

const FIRST_REPEAT_INTERVAL = 400
const REPEAT_INTERVAL = 75

export const useKeyboard = () => {
  // Handle a key being pressed.
  const handleKey = useCallback((key: string) => {
    switch (key) {
      case keybinds.newGame:
        // r
        startNewGame(tetrisStore)
        break

      case keybinds.moveLeft:
        // left
        attemptToDoMove(tetrisStore, 'LEFT')
        break

      case keybinds.moveRight:
        // right
        attemptToDoMove(tetrisStore, 'RIGHT')
        break

      case keybinds.rotate:
        // up
        attemptToDoMove(tetrisStore, 'ROTATE')
        break

      case keybinds.moveDown:
        // down
        attemptToDoMove(tetrisStore, 'DOWN')
        break

      case keybinds.goToBottom:
        // space
        if (tetrisStore.getState().gamestate === 'gameover') {
          startNewGame(tetrisStore)
        } else {
          moveGoToBottom(tetrisStore)
        }
        break
    }
  }, [])

  const pressedKeys = useRef(new Set<string>())
  const animationFrameRefs = useRef(new Map<string, number>())
  const handlePressedKey = useCallback(
    (key: string) => {
      const existingAnimationFrame = animationFrameRefs.current.get(key)
      if (existingAnimationFrame != null) {
        cancelAnimationFrame(existingAnimationFrame)
        animationFrameRefs.current.delete(key)
      }

      let start = Date.now()
      let first = true
      const handler: FrameRequestCallback = () => {
        if (!pressedKeys.current.has(key)) {
          animationFrameRefs.current.delete(key)
          return
        }
        const now = Date.now()
        if (now - start > (first ? FIRST_REPEAT_INTERVAL : REPEAT_INTERVAL)) {
          start = now
          first = false
          handleKey(key)
        }
        animationFrameRefs.current.set(key, requestAnimationFrame(handler))
      }
      animationFrameRefs.current.set(key, requestAnimationFrame(handler))
    },
    [handleKey]
  )

  // Whenever the current shape changes, reset all the pressed keys to stop
  // moving the shape.
  const shape = useTetrisStore(selectCurrentShape)
  useEffect(() => {
    pressedKeys.current.clear()
  }, [shape])

  const pressKey = useCallback(
    (key: string) => {
      handleKey(key)
      pressedKeys.current.add(key)
      handlePressedKey(key)
    },
    [handleKey, handlePressedKey]
  )

  useEffect(() => {
    const currentPressedKeys = pressedKeys.current
    const currentAnimationFrameRefs = animationFrameRefs.current
    const keydownHandler = (evt: KeyboardEvent) => {
      if (handledKeys.has(evt.key)) {
        evt.preventDefault()

        if (!evt.repeat) {
          pressKey(evt.key)
        }
      }
    }
    const keyupHandler = (evt: KeyboardEvent) => {
      currentPressedKeys.delete(evt.key)
    }
    document.addEventListener('keydown', keydownHandler)
    document.addEventListener('keyup', keyupHandler, { passive: true })
    return () => {
      document.removeEventListener('keydown', keydownHandler)
      document.removeEventListener('keyup', keyupHandler)
      currentPressedKeys.clear()
      for (const animationFrame of currentAnimationFrameRefs.values()) {
        cancelAnimationFrame(animationFrame)
      }
      currentAnimationFrameRefs.clear()
    }
  }, [handleKey, pressKey])
}
