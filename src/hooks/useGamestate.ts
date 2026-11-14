import { useMemo } from 'react'
import { TetrisState, useTetrisStore } from '../store/tetris'

const selectGamestate = (state: TetrisState) => state.gamestate

export const useGamestate = () => {
  const gamestate = useTetrisStore(selectGamestate)
  return useMemo(() => ({ gamestate }), [gamestate])
}
