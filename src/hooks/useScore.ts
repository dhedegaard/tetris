import { useCallback, useMemo } from "react";
import { scoreActions } from "../store/slices/score";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";

/** Calculate the amount of score points earned, based on the number of lines cleared and the level. */
export const calculateScore = (level: number, linesCleared: number): number => {
  switch (linesCleared) {
    case 1:
      return 40 * (level + 1);
    case 2:
      return 100 * (level + 1);
    case 3:
      return 300 * (level + 1);
    case 4:
      return 1200 * (level + 1);
  }
  throw new Error(
    "Unhandled case, level:" + level + ", linesCleared:" + linesCleared
  );
};

const scoreSelector = (state: TetrisStoreState) => state.score.score;

/** Handles keeping track of the current score in the game. */
const useScore = () => {
  const score = useTetrisSelector(scoreSelector);
  const dispatch = useTetrisDispatch();
  const increaseScore = useCallback(
    (amount: number) => dispatch(scoreActions.increaseScore(amount)),
    [dispatch]
  );

  const resetScore = useCallback(
    () => dispatch(scoreActions.resetScore()),
    [dispatch]
  );

  return useMemo(
    () => ({
      score,
      increaseScore,
      resetScore,
    }),
    [increaseScore, resetScore, score]
  );
};

export default useScore;
