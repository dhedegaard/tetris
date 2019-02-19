import { Direction, ShapeProps } from '.'
import { Coordinates } from '../ShapeDrawer'

export const COLOR_Z = 'red'

export default ({ direction, x, y }: ShapeProps): Coordinates => {
  switch (direction) {
    case Direction.UP:
    case Direction.DOWN:
      return [
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x, y },
        { x, y: y + 1 }
      ]
    case Direction.LEFT:
    case Direction.RIGHT:
      return [
        { x: x - 1, y },
        { x, y },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 }
      ]
  }
}
