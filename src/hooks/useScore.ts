import { useCallback, useMemo } from "react";
import { scoreActions } from "../store/slices/score";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";

/** Calculate the amount of score points earned, based on the number of lines cleared and the level. */

const scoreSelector = (state: TetrisStoreState) => state.score.score;

/** Handles keeping track of the current score in the game. */
const useScore = () => {
  const score = useTetrisSelector(scoreSelector);
  const dispatch = useTetrisDispatch();
  const increaseScore = useCallback(
    (amount: number) => dispatch(scoreActions.increaseScore(amount)),
    [dispatch]
  );

  return useMemo(() => ({ score, increaseScore }), [increaseScore, score]);
};

export default useScore;
