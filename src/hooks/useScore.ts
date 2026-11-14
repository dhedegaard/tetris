import { useMemo } from 'react'
import { TetrisState, useTetrisStore } from '../store/tetris'

/** Calculate the amount of score points earned, based on the number of lines cleared and the level. */

const scoreSelector = (state: TetrisState) => state.score

/** Handles keeping track of the current score in the game. */
export const useScore = () => {
  const score = useTetrisStore(scoreSelector)
  return useMemo(() => ({ score }), [score])
}
