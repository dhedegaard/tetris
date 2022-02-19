import { useCallback, useMemo } from "react";
import { TetrisDispatch, TetrisState } from "./reducer";

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

/** Handles keeping track of the current score in the game. */
const useScore = (state: TetrisState, dispatch: TetrisDispatch) => {
  const increaseScore = useCallback(
    (amount: number) =>
      dispatch({
        type: "INCREASE_SCORE",
        amount,
      }),
    [dispatch]
  );

  const resetScore = useCallback(
    () => dispatch({ type: "RESET_SCORE" }),
    [dispatch]
  );

  return useMemo(
    () => ({
      score: state.score,
      increaseScore,
      resetScore,
    }),
    [increaseScore, resetScore, state.score]
  );
};

export default useScore;
