import { useCallback, useEffect, useRef } from 'react'
import { attemptToDoMove, moveGoToBottom, startNewGame } from '../store/actions/game'
import { useTetrisDispatch } from '../store/tetris'
import { Gamestate, useGamestate } from './useGamestate'

const DEFAULT_INTERVAL = 150

export const useGamepad = () => {
  const dispatch = useTetrisDispatch()
  const { gamestate } = useGamestate()
  const gamestateRef = useRef<Gamestate>(gamestate)
  useEffect(() => {
    gamestateRef.current = gamestate
  }, [gamestate])

  const mountedRef = useRef(false)
  const animationFrameRefs = useRef(new Map<number, number>())
  const lastClickedRef = useRef<{ [key: string]: number }>({})
  const handleGamepad = useCallback(
    (_gamepad: Gamepad) => {
      const gamepadIndex = _gamepad.index
      const existingAnimationFrame = animationFrameRefs.current.get(gamepadIndex)
      if (existingAnimationFrame != null) {
        cancelAnimationFrame(existingAnimationFrame)
        animationFrameRefs.current.delete(gamepadIndex)
      }

      const moveNullOrAfterInterval = (move: string) => {
        const lastClicked = lastClickedRef.current[move]
        return lastClicked == null || Date.now() - lastClicked >= DEFAULT_INTERVAL
      }

      const handler: FrameRequestCallback = () => {
        animationFrameRefs.current.delete(gamepadIndex)

        if (!mountedRef.current) {
          return
        }

        const gamepad = navigator.getGamepads()[gamepadIndex]
        if (gamepad == null || !gamepad.connected) {
          return
        }

        const now = Date.now()
        const { buttons, axes } = gamepad
        if (gamestateRef.current === 'alive') {
          if (
            buttons[12]?.pressed === true ||
            buttons[0]?.pressed === true ||
            (axes[1] != null && axes[1] < -0.9)
          ) {
            // Up or A
            if (moveNullOrAfterInterval('ROTATE')) {
              dispatch(attemptToDoMove('ROTATE'))
              lastClickedRef.current['ROTATE'] = now
            }
          }
          if (buttons[13]?.pressed === true || (axes[1] != null && axes[1] > 0.9)) {
            // Down
            if (moveNullOrAfterInterval('DOWN')) {
              dispatch(attemptToDoMove('DOWN'))
              lastClickedRef.current['DOWN'] = now - 125
            }
          }
          if (buttons[14]?.pressed === true || (axes[0] != null && axes[0] < -0.9)) {
            // Left
            if (moveNullOrAfterInterval('LEFT')) {
              dispatch(attemptToDoMove('LEFT'))
              lastClickedRef.current['LEFT'] = now
            }
          }
          if (buttons[15]?.pressed === true || (axes[0] != null && axes[0] > 0.9)) {
            // Right
            if (moveNullOrAfterInterval('RIGHT')) {
              dispatch(attemptToDoMove('RIGHT'))
              lastClickedRef.current['RIGHT'] = now
            }
          }
          if (buttons[1]?.pressed === true) {
            // B
            if (moveNullOrAfterInterval('moveToBottom')) {
              dispatch(moveGoToBottom())
              lastClickedRef.current['moveToBottom'] = now + 850
            }
          }
        }
        if (gamestateRef.current === 'gameover' && buttons[0]?.pressed === true) {
          // A
          dispatch(startNewGame())
        }

        animationFrameRefs.current.set(gamepadIndex, requestAnimationFrame(handler))
      }
      animationFrameRefs.current.set(gamepadIndex, requestAnimationFrame(handler))
    },
    [dispatch]
  )

  useEffect(() => {
    mountedRef.current = true
    const animationFrames = animationFrameRefs.current

    const handler = ({ gamepad }: GamepadEvent) => {
      handleGamepad(gamepad)
    }
    window.addEventListener('gamepadconnected', handler, { passive: true })
    return () => {
      mountedRef.current = false
      window.removeEventListener('gamepadconnected', handler)
      for (const animationFrame of animationFrames.values()) {
        cancelAnimationFrame(animationFrame)
      }
      animationFrames.clear()
    }
  }, [handleGamepad])
}
