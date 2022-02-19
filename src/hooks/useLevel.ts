import { useCallback, useMemo, useState } from "react";
import { levelActions, selectLevel } from "../store/slices/level";
import { useTetrisDispatch, useTetrisSelector } from "../store/tetris";

/** The level of the game */
const useLevel = () => {
  const dispatch = useTetrisDispatch();
  const level = useTetrisSelector(selectLevel);

  /** Call this to increase the number of rows cleared, and maybe the level. */
  const incrementRowsCleared = useCallback(
    (amount: number) => dispatch(levelActions.incrementRowsCleared(amount)),
    [dispatch]
  );

  /** Call this to reset the level state. */
  const resetLevel = useCallback(
    () => dispatch(levelActions.resetLevel()),
    [dispatch]
  );

  return useMemo(
    () => ({
      level,
      incrementRowsCleared,
      resetLevel,
    }),
    [incrementRowsCleared, level, resetLevel]
  );
};

export default useLevel;
