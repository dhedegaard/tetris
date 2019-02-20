import { useEffect } from 'react'
import { Coordinate, Coordinates } from '../components/ShapeDrawer'
import { calculateCoordinates, Direction, Shapes } from '../components/shapes'

export default (
  stateRef: React.MutableRefObject<{
    position: Coordinate
    direction: Direction
    shape: Shapes
  }>,
  isFreePositions: (newPositions: Coordinates) => boolean,
  moveLeft: () => void,
  moveRight: () => void,
  setNextDirection: () => void,
  getNextDirection: () => Direction,
  setMoveToBottom: (moveToBottom: boolean) => void
) => {
  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      const { position, direction, shape } = stateRef.current
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
            direction: getNextDirection(),
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
