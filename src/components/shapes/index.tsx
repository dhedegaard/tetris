import React from 'react'
import J from './J'
import L from './L'
import O from './O'
import S from './S'
import T from './T'
import Z from './Z'

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

export type Shapes = 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

export const Shape: React.FunctionComponent<ShapeProps & { shape: Shapes }> = ({
  shape,
  ...props
}) => {
  switch (shape) {
    case 'J':
      return <J {...props} />
    case 'L':
      return <L {...props} />
    case 'O':
      return <O {...props} />
    case 'S':
      return <S {...props} />
    case 'T':
      return <T {...props} />
    case 'Z':
      return <Z {...props} />
  }
}
