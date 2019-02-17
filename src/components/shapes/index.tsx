export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

/** Returns the new direction based on a current direction. */
export const nextDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.UP:
      return Direction.RIGHT
    case Direction.RIGHT:
      return Direction.DOWN
    case Direction.DOWN:
      return Direction.LEFT
    case Direction.LEFT:
      return Direction.UP
  }
}

export interface ShapeProps {
  x: number
  y: number
  direction: Direction
  children?: undefined
}
