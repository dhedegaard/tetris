import { useCallback, useMemo } from "react";
import {
  selectCurrentShape,
  selectPeekShapes,
  shapeActions,
} from "../store/slices/shape";
import { useTetrisDispatch, useTetrisSelector } from "../store/tetris";

/** Handles logic for determining the next shape to use. */
const useShape = () => {
  const peekShapes = useTetrisSelector(selectPeekShapes);
  const currentShape = useTetrisSelector(selectCurrentShape);

  return useMemo(
    () => ({ shape: currentShape, peekShapes }),
    [currentShape, peekShapes]
  );
};

export default useShape;
