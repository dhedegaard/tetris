import { useState } from 'react'
import { Coordinate, Coordinates } from '../components/ShapeDrawer'
import { calculateCoordinates, Direction, Shapes } from '../components/shapes'
import useInterval from './useInterval'

export default (
  shape: Shapes,
  direction: Direction,
  position: Coordinate,
  isFreePositions: (positions: Coordinates) => boolean,
  moveDown: () => void,
  persistBlock: (position: Coordinates) => void
) => {
  const [interval, setInterval] = useState(1000)

  useInterval(() => {
    const newPositions = calculateCoordinates(shape, {
      direction,
      x: position.x,
      y: position.y + 1
    })

    // If the next position is free, move down to it.
    if (isFreePositions(newPositions)) {
      moveDown()
      return
    }

    // Otherwise, persist the blocks and start a new shape.
    const oldPositions = calculateCoordinates(shape, {
      direction,
      x: position.x,
      y: position.y
    })
    persistBlock(oldPositions)
  }, interval)

  return {
    interval,
    setInterval
  }
}
