import { useCallback, useMemo } from "react";
import { TetrisDispatch, TetrisState } from "./reducer";

/** Handles logic for determining the next shape to use. */
const useShape = (state: TetrisState, dispatch: TetrisDispatch) => {
  const shape = state.currentShape;

  /** Pops the next shape and sets it as the current shape state. */
  const nextShape = useCallback(
    () => dispatch({ type: "NEXT_SHAPE" }),
    [dispatch]
  );

  return useMemo(
    () => ({
      shape,
      nextShape,
      peekShapes: state.shapeQueue,
    }),
    [nextShape, shape, state.shapeQueue]
  );
};

export default useShape;
