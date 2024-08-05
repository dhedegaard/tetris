import { useMemo } from 'react'
import { TetrisStoreState, useTetrisSelector } from '../store/tetris'

const selectGamestate = (state: TetrisStoreState) => state.gamestate.gamestate

export type Gamestate = 'alive' | 'gameover'

export const useGamestate = () => {
  const gamestate = useTetrisSelector(selectGamestate)
  return useMemo(() => ({ gamestate }), [gamestate])
}
