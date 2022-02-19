import { useCallback, useMemo } from "react";
import {
  selectCurrentShape,
  selectPeekShapes,
  shapeActions,
} from "../store/slices/shape";
import { useTetrisDispatch, useTetrisSelector } from "../store/tetris";
import { TetrisDispatch, TetrisState } from "./reducer";

/** Handles logic for determining the next shape to use. */
const useShape = () => {
  const peekShapes = useTetrisSelector(selectPeekShapes);
  const currentShape = useTetrisSelector(selectCurrentShape);
  const dispatch = useTetrisDispatch();

  /** Pops the next shape and sets it as the current shape state. */
  const nextShape = useCallback(
    () => dispatch(shapeActions.nextShape()),
    [dispatch]
  );

  return useMemo(
    () => ({
      shape: currentShape,
      nextShape,
      peekShapes,
    }),
    [currentShape, nextShape, peekShapes]
  );
};

export default useShape;
