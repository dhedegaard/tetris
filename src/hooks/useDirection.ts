import { useMemo } from 'react'
import { type TetrisState, useTetrisStore } from '../store/tetris'

const selectDirection = (state: TetrisState) => state.direction

export const useDirection = () => {
  const direction = useTetrisStore(selectDirection)

  return useMemo(() => ({ direction }), [direction])
}
