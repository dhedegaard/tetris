import { useMemo } from 'react'
import { type TetrisState, useTetrisStore } from '../store/tetris'

const selectScore = (state: TetrisState) => state.score

/** Handles keeping track of the current score in the game. */
export const useScore = () => {
  const score = useTetrisStore(selectScore)
  return useMemo(() => ({ score }), [score])
}
