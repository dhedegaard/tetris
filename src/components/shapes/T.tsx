import { Direction, ShapeProps } from '.'
import { Coordinates } from '../ShapeDrawer'

export const COLOR_T = 'purple'

export default ({ direction, x, y }: ShapeProps): Coordinates => {
  const result: Coordinates = [{ x, y }]
  if (direction !== Direction.DOWN) {
    result.push({ x, y: y - 1 })
  }
  if (direction !== Direction.LEFT) {
    result.push({ x: x + 1, y })
  }
  if (direction !== Direction.UP) {
    result.push({ x, y: y + 1 })
  }
  if (direction !== Direction.RIGHT) {
    result.push({ x: x - 1, y })
  }
  return result
}
