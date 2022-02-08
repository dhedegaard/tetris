import { useCallback, useMemo, useState } from "react";
import { Direction, nextDirection } from "../components/shapes";

const DEFAULT_DIRECTION = Direction.RIGHT;

const useDirections = () => {
  const [direction, setDirection] = useState(DEFAULT_DIRECTION);

  const resetDirection = useCallback(() => setDirection(DEFAULT_DIRECTION), []);
  const setNextDirection = useCallback(
    () => setDirection((oldDirection) => nextDirection(oldDirection)),
    []
  );

  return useMemo(
    () => ({
      direction,
      resetDirection,
      setNextDirection,
    }),
    [direction, resetDirection, setNextDirection]
  );
};

export default useDirections;
