import { useMemo } from 'react'
import { type TetrisState, useTetrisStore } from '../store/tetris'

const selectPosition = (state: TetrisState) => state.position

export const usePosition = () => {
  const position = useTetrisStore(selectPosition)
  return useMemo(() => ({ position }), [position])
}
