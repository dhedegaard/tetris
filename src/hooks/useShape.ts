import { useMemo } from 'react'
import { calculateCoordinates } from '../components/shapes'
import {
  selectCurrentShape,
  selectIsShapeQueueReady,
  selectShapeQueue,
  upcomingShapes,
} from '../store/slices/shape'
import { useTetrisStore } from '../store/tetris'
import { useDirection } from './useDirection'
import { usePosition } from './usePosition'

/** Handles logic for determining the next shape to use. */
export const useShape = () => {
  const shapeQueue = useTetrisStore(selectShapeQueue)
  const peekShapes = useMemo(() => upcomingShapes(shapeQueue), [shapeQueue])
  const currentShape = useTetrisStore(selectCurrentShape)
  const isShapeQueueReady = useTetrisStore(selectIsShapeQueueReady)
  const { position } = usePosition()
  const { direction } = useDirection()

  const concretePositions = useMemo(
    () =>
      calculateCoordinates(currentShape.shape, {
        direction,
        x: position.x,
        y: position.y,
      }),
    [currentShape, direction, position.x, position.y]
  )

  return useMemo(
    () => ({
      shape: currentShape,
      peekShapes,
      concretePositions,
      isShapeQueueReady,
    }),
    [concretePositions, currentShape, isShapeQueueReady, peekShapes]
  )
}
