import { useMemo } from "react";
import { TetrisStoreState, useTetrisSelector } from "../store/tetris";

const selectDirection = (state: TetrisStoreState) => state.direction.direction;

const useDirections = () => {
  const direction = useTetrisSelector(selectDirection);

  return useMemo(() => ({ direction }), [direction]);
};

export default useDirections;
