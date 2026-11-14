import { useMemo } from 'react'
import { Gamestate, TetrisState, useTetrisStore } from '../store/tetris'

const selectGamestate = (state: TetrisState) => state.gamestate

export type { Gamestate }

export const useGamestate = () => {
  const gamestate = useTetrisStore(selectGamestate)
  return useMemo(() => ({ gamestate }), [gamestate])
}
