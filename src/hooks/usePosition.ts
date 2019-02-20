import { useState } from 'react'
import { Direction } from '../components/shapes'

const DEFAULT_POSITION = Object.freeze({ x: 4, y: 1 })

export default () => {
  const [position, setPosition] = useState<{ x: number; y: number }>(
    DEFAULT_POSITION
  )

  const movePosition = (direction: Direction) =>
    setPosition(oldPosition => {
      switch (direction) {
        case Direction.UP:
          return { ...oldPosition, y: oldPosition.y - 1 }
        case Direction.DOWN:
          return { ...oldPosition, y: oldPosition.y + 1 }
        case Direction.LEFT:
          return { ...oldPosition, x: oldPosition.x - 1 }
        case Direction.RIGHT:
          return { ...oldPosition, x: oldPosition.x + 1 }
      }
    })

  return {
    position,
    moveLeft: () => movePosition(Direction.LEFT),
    moveRight: () => movePosition(Direction.RIGHT),
    moveDown: () => movePosition(Direction.DOWN),
    resetPosition: () => setPosition(DEFAULT_POSITION)
  }
}
