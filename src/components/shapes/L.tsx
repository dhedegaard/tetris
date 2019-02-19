import { Direction, ShapeProps } from '.'
import { Coordinates } from '../ShapeDrawer'

export const COLOR_L = 'orange'

export default ({ direction, x, y }: ShapeProps): Coordinates => {
  switch (direction) {
    case Direction.UP:
      return [
        { x, y: y - 1 },
        { x, y },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 }
      ]
    case Direction.RIGHT:
      return [
        { x: x - 1, y: y + 1 },
        { x: x - 1, y },
        { x, y },
        { x: x + 1, y }
      ]
    case Direction.DOWN:
      return [
        { x, y: y - 1 },
        { x: x - 1, y: y - 1 },
        { x, y },
        { x, y: y + 1 }
      ]
    case Direction.LEFT:
      return [
        { x: x - 1, y },
        { x, y },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 }
      ]
  }
}
