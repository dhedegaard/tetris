import { ShapeProps } from '.'
import { Coordinates } from '../ShapeDrawer'

export const COLOR_L = 'orange'

export const L = ({ direction, x, y }: ShapeProps): Coordinates => {
  switch (direction) {
    case 'UP':
      return [
        { x, y: y - 1 },
        { x, y },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 },
      ]
    case 'RIGHT':
      return [
        { x: x - 1, y: y + 1 },
        { x: x - 1, y },
        { x, y },
        { x: x + 1, y },
      ]
    case 'DOWN':
      return [
        { x, y: y - 1 },
        { x: x - 1, y: y - 1 },
        { x, y },
        { x, y: y + 1 },
      ]
    case 'LEFT':
      return [
        { x: x - 1, y },
        { x, y },
        { x: x + 1, y },
        { x: x + 1, y: y - 1 },
      ]
  }
}
