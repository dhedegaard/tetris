import { useMemo } from 'react'
import { TetrisState, useTetrisStore } from '../store/tetris'

const blocksSelect = (state: TetrisState) => state.blocks

export const useBlocks = () => {
  const blocks = useTetrisStore(blocksSelect)

  return useMemo(() => ({ blocks }), [blocks])
}
