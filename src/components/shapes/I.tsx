import { ShapeProps } from '.'
import { Coordinates } from '../ShapeDrawer'

export const COLOR_I = 'cyan'

export const I = ({ direction, x, y }: ShapeProps): Coordinates => {
  switch (direction) {
    case 'UP':
    case 'DOWN':
      return [
        { x, y: y - 1 },
        { x, y },
        { x, y: y + 1 },
        { x, y: y + 2 },
      ]
    case 'LEFT':
    case 'RIGHT':
      return [
        { x: x - 1, y },
        { x, y },
        { x: x + 1, y },
        { x: x + 2, y },
      ]
  }
}
