import { ShapeProps } from '.'
import { Coordinates } from '../ShapeDrawer'

export const COLOR_O = 'yellow'

export default ({ x, y }: ShapeProps): Coordinates => [
  { x, y },
  { x: x + 1, y },
  { x, y: y + 1 },
  { x: x + 1, y: y + 1 }
]
