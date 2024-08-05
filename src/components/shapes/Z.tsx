import { ShapeProps } from '.'
import { Coordinates } from '../ShapeDrawer'

export const COLOR_Z = 'red'

export const Z = ({ direction, x, y }: ShapeProps): Coordinates => {
  switch (direction) {
    case 'UP':
    case 'DOWN':
      return [
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x, y },
        { x, y: y + 1 },
      ]
    case 'LEFT':
    case 'RIGHT':
      return [
        { x: x - 1, y },
        { x, y },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 },
      ]
  }
}
