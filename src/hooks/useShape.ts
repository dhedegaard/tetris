import { useMemo } from "react";
import { calculateCoordinates } from "../components/shapes";
import { selectCurrentShape, selectPeekShapes } from "../store/slices/shape";
import { useTetrisSelector } from "../store/tetris";
import useDirection from "./useDirection";
import usePosition from "./usePosition";

/** Handles logic for determining the next shape to use. */
const useShape = () => {
  const peekShapes = useTetrisSelector(selectPeekShapes);
  const currentShape = useTetrisSelector(selectCurrentShape);
  const { position } = usePosition();
  const { direction } = useDirection();

  const concretePositions = useMemo(
    () =>
      calculateCoordinates(currentShape.shape, {
        direction,
        x: position.x,
        y: position.y,
      }),
    [currentShape, direction, position.x, position.y]
  );

  return useMemo(
    () => ({
      shape: currentShape,
      peekShapes,
      concretePositions,
    }),
    [concretePositions, currentShape, peekShapes]
  );
};

export default useShape;
