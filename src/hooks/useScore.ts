import { useMemo } from 'react'
import { TetrisStoreState, useTetrisSelector } from '../store/tetris'

/** Calculate the amount of score points earned, based on the number of lines cleared and the level. */

const scoreSelector = (state: TetrisStoreState) => state.score.score

/** Handles keeping track of the current score in the game. */
export const useScore = () => {
  const score = useTetrisSelector(scoreSelector)
  return useMemo(() => ({ score }), [score])
}
