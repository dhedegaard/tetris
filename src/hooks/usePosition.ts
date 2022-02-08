import { useCallback, useMemo, useState } from "react";
import { Direction } from "../components/shapes";

const DEFAULT_POSITION = Object.freeze({ x: 4, y: 1 });

const usePosition = () => {
  const [position, setPosition] =
    useState<{ x: number; y: number }>(DEFAULT_POSITION);

  const movePosition = useCallback(
    (direction: Direction) =>
      setPosition((oldPosition) => {
        switch (direction) {
          case Direction.UP:
            return { ...oldPosition, y: oldPosition.y - 1 };
          case Direction.DOWN:
            return { ...oldPosition, y: oldPosition.y + 1 };
          case Direction.LEFT:
            return { ...oldPosition, x: oldPosition.x - 1 };
          case Direction.RIGHT:
            return { ...oldPosition, x: oldPosition.x + 1 };
        }
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
  const resetPosition = useCallback(() => setPosition(DEFAULT_POSITION), []);

  return useMemo(
    () => ({
      position,
      moveLeft,
      moveRight,
      moveDown,
      resetPosition,
    }),
    [moveDown, moveLeft, moveRight, position, resetPosition]
  );
};

export default usePosition;
