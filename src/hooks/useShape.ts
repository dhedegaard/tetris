import { useCallback, useMemo } from "react";
import { Coordinates } from "../components/ShapeDrawer";
import { Shapes } from "../components/shapes";
import { TetrisDispatch, TetrisState } from "./reducer";

export interface ShapeElement {
  shape: Shapes;
  key: string;
  color: string;
  coordinates: Coordinates;
}

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
