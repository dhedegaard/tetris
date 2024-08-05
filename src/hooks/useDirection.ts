import { useMemo } from 'react'
import { TetrisStoreState, useTetrisSelector } from '../store/tetris'

const selectDirection = (state: TetrisStoreState) => state.direction.direction

export const useDirection = () => {
  const direction = useTetrisSelector(selectDirection)

  return useMemo(() => ({ direction }), [direction])
}
