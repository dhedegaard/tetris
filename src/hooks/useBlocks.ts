import { useMemo } from 'react'
import { type TetrisState, useTetrisStore } from '../store/tetris'

const selectBlocks = (state: TetrisState) => state.blocks

export const useBlocks = () => {
  const blocks = useTetrisStore(selectBlocks)

  return useMemo(() => ({ blocks }), [blocks])
}
