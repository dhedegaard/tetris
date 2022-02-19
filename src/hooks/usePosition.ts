import { useCallback, useMemo } from "react";
import { Direction } from "../components/shapes";
import { TetrisDispatch, TetrisState } from "./reducer";

const usePosition = (state: TetrisState, dispatch: TetrisDispatch) => {
  const movePosition = useCallback(
    (direction: Direction) =>
      dispatch({
        type: "MOVE_POSITION",
        dx:
          direction === Direction.LEFT
            ? -1
            : direction === Direction.RIGHT
            ? 1
            : 0,
        dy:
          direction === Direction.DOWN
            ? 1
            : direction === Direction.UP
            ? -1
            : 0,
      }),
    []
  );

  const moveLeft = useCallback(
    () => movePosition(Direction.LEFT),
    [movePosition]
  );
  const moveRight = useCallback(
    () => movePosition(Direction.RIGHT),
    [movePosition]
  );
  const moveDown = useCallback(
    () => movePosition(Direction.DOWN),
    [movePosition]
  );
  const resetPosition = useCallback(
    () => dispatch({ type: "RESET_POSITION" }),
    [dispatch]
  );

  return useMemo(
    () => ({
      position: state.position,
      moveLeft,
      moveRight,
      moveDown,
      resetPosition,
    }),
    [moveDown, moveLeft, moveRight, resetPosition, state.position]
  );
};

export default usePosition;
