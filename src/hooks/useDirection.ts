import { useMemo } from 'react'
import { TetrisState, useTetrisStore } from '../store/tetris'

const selectDirection = (state: TetrisState) => state.direction

export const useDirection = () => {
  const direction = useTetrisStore(selectDirection)

  return useMemo(() => ({ direction }), [direction])
}
