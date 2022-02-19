import { shuffle, uniqueId } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { colorFromShape, Shapes, SHAPES } from "../components/shapes";

const getRandomShapes = () =>
  shuffle(SHAPES).map((shape) => ({
    shape,
    key: uniqueId("shape-"),
    color: colorFromShape(shape),
  }));

export interface ShapeElement {
  shape: Shapes;
  key: string;
  color: string;
}

/** Handles logic for determining the next shape to use. */
const useShape = () => {
  const [peekShapes, setPeekShapes] = useState<readonly ShapeElement[]>([
    ...getRandomShapes(),
    ...getRandomShapes(),
  ]);
  const shape = useMemo(() => peekShapes[0]!, [peekShapes]);

  /** Pops the next shape and sets it as the current shape state. */
  const nextShape = useCallback(() => {
    setPeekShapes((old) =>
      old.length === 1 ? getRandomShapes() : old.slice(1)
    );
  }, []);

  // Make sure to add more shapes to the queue.
  useEffect(
    () =>
      setPeekShapes((old) =>
        old.length >= SHAPES.length ? old : [...old, ...getRandomShapes()]
      ),
    [peekShapes.length]
  );

  return useMemo(
    () => ({
      shape,
      nextShape,
      peekShapes,
    }),
    [nextShape, peekShapes, shape]
  );
};

export default useShape;
