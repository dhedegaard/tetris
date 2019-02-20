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
  getNextDirection: () => Direction
) => {
  useEffect(() => {
    const keypressHandler = (evt: KeyboardEvent) => {
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
        default:
          console.log('Unknown keycode:', evt.keyCode)
      }
    }

    document.addEventListener('keydown', keypressHandler)
    return () => document.removeEventListener('keydown', keypressHandler)
  }, [])
}
