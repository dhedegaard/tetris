import { shuffle, uniqueId } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Shapes, SHAPES } from "../components/shapes";

const getRandomShapes = () => shuffle(SHAPES);

/** Handles logic for determining the next shape to use. */
const useShape = () => {
  const [peekShapes, setPeekShapes] = useState<Shapes[]>([
    ...getRandomShapes(),
    ...getRandomShapes(),
  ]);
  const shape = useMemo(
    () => ({
      shape: peekShapes[0]!,
      key: uniqueId("shape-"),
    }),
    [peekShapes]
  );

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
