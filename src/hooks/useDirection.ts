import { useCallback, useMemo, useState } from "react";
import { Direction, nextDirection } from "../components/shapes";
import { TetrisDispatch, TetrisState } from "./reducer";

const useDirections = (state: TetrisState, dispatch: TetrisDispatch) => {
  const resetDirection = useCallback(
    () => dispatch({ type: "RESET_DIRECTION" }),
    [dispatch]
  );
  const setNextDirection = useCallback(
    () => dispatch({ type: "ROTATE_DIRECTION" }),
    [dispatch]
  );

  return useMemo(
    () => ({
      direction: state.direction,
      resetDirection,
      setNextDirection,
    }),
    [resetDirection, setNextDirection, state.direction]
  );
};

export default useDirections;
