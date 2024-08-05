import { ShapeProps } from '.'
import { Coordinates } from '../ShapeDrawer'

export const COLOR_S = 'green'

export const S = ({ direction, x, y }: ShapeProps): Coordinates => {
  switch (direction) {
    case 'UP':
    case 'DOWN':
      return [
        { x, y: y - 1 },
        { x, y },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
      ]
    case 'LEFT':
    case 'RIGHT':
      return [
        { x, y },
        { x: x + 1, y },
        { x, y: y + 1 },
        { x: x - 1, y: y + 1 },
      ]
  }
}
