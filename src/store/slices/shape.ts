import { getRandomShapes, SHAPES, type ShapeElement } from '../../components/shapes'
import type { TetrisState } from '../tetris'

/** Drops the current shape, topping the queue up first if it's running low. */
export const advanceShapeQueue = (queue: readonly ShapeElement[]): ShapeElement[] =>
  (queue.length < SHAPES.length ? [...queue, ...getRandomShapes()] : queue).slice(1)

export const selectIsShapeQueueReady = (state: TetrisState) => state.hasRandomizedInitialQueue

export const selectCurrentShape = (state: TetrisState): ShapeElement => {
  const [firstShape] = state.shapeQueue
  if (firstShape == null) {
    throw new Error('The shape queue is empty.')
  }
  return firstShape
}

/** The upcoming shapes shown in the legend. */
export const peekShapes = (queue: readonly ShapeElement[]) => queue.slice(1, 3)
