import { useEffect } from 'react'
import { StateRef } from '.'
import { calculateCoordinates, nextDirection } from '../components/shapes'

export default (
  stateRef: StateRef,
  moveLeft: () => void,
  moveRight: () => void,
  setNextDirection: () => void,
  setMoveToBottom: (moveToBottom: boolean) => void,
  newGame: () => void
) => {
  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      if (evt.repeat) {
        return
      }

      const {
        position,
        direction,
        shape,
        isFreePositions,
        gamestate
      } = stateRef.current
      // If the game is over, allow a different set of keybinds.
      if (gamestate === 'gameover') {
        switch (evt.keyCode) {
          case 82: // 'r'
            newGame()
        }
        return
      }

      switch (evt.keyCode) {
        case 37: {
          // left
          const newPositions = calculateCoordinates(shape, {
            direction,
            x: position.x - 1,
            y: position.y
          })
          if (isFreePositions(newPositions)) {
            moveLeft()
          }
          break
        }
        case 39: {
          // right
          const newPositions = calculateCoordinates(shape, {
            direction,
            x: position.x + 1,
            y: position.y
          })
          if (isFreePositions(newPositions)) {
            moveRight()
          }
          break
        }
        case 38: {
          // up
          const newPositions = calculateCoordinates(shape, {
            direction: nextDirection(direction),
            x: position.x,
            y: position.y
          })
          if (isFreePositions(newPositions)) {
            setNextDirection()
          }
          break
        }
        case 40: {
          // down
          setMoveToBottom(true)
          break
        }
      }
    }
    const keyupHandler = (evt: KeyboardEvent) => {
      switch (evt.keyCode) {
        case 40: {
          // down
          setMoveToBottom(false)
          break
        }
      }
    }

    document.addEventListener('keydown', keydownHandler)
    document.addEventListener('keyup', keyupHandler)
    return () => {
      document.removeEventListener('keydown', keydownHandler)
      document.removeEventListener('keyup', keyupHandler)
    }
  }, [])
}
