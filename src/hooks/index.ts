import { useEffect, useMemo } from 'react'
import { runTicks, startNewGame } from '../store/actions/game'
import { shapeActions } from '../store/slices/shape'
import { useTetrisDispatch } from '../store/tetris'
import { useBlocks } from './useBlocks'
import { useDirection } from './useDirection'
import { useGamepad } from './useGamepad'
import { useGamestate } from './useGamestate'
import { useKeyboard } from './useKeyboard'
import { useLevel } from './useLevel'
import { usePosition } from './usePosition'
import { useScore } from './useScore'
import { useShape } from './useShape'
import { useShapeBounds } from './useShapeBounds'

/** A hook that contains all the logic regarding tetris. */
export const useTetris = () => {
  const { gamestate } = useGamestate()
  const { position } = usePosition()
  const { shape, peekShapes, isShapeQueueReady } = useShape()
  const { direction } = useDirection()
  const { score } = useScore()
  const { blocks } = useBlocks()
  const { level } = useLevel()
  const shapeBounds = useShapeBounds()
  const dispatch = useTetrisDispatch()

  // Replace the deterministic SSR queue with a random client queue before
  // starting the game loop.
  useEffect(() => {
    dispatch(shapeActions.randomizeInitialQueue())
  }, [dispatch])

  // Handle ticks
  useEffect(() => {
    if (!isShapeQueueReady) {
      return
    }

    let cancelled = false
    void dispatch(runTicks(() => cancelled))
    return () => {
      cancelled = true
    }
  }, [dispatch, isShapeQueueReady])

  // Handle inputs.
  useKeyboard()
  useGamepad()

  return useMemo(
    () => ({
      blocks,
      direction,
      position,
      shape,
      gamestate,
      score,
      peekShapes,
      isShapeQueueReady,
      level,
      shapeBounds,
      startNewGame: () => {
        dispatch(startNewGame())
      },
    }),
    [
      blocks,
      direction,
      dispatch,
      gamestate,
      isShapeQueueReady,
      level,
      peekShapes,
      position,
      score,
      shape,
      shapeBounds,
    ]
  )
}
