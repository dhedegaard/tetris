import { useMemo } from "react";
import { TetrisStoreState, useTetrisSelector } from "../store/tetris";

const selectDirection = (state: TetrisStoreState) => state.position.position;

const usePosition = () => {
  const position = useTetrisSelector(selectDirection);
  return useMemo(() => ({ position }), [position]);
};

export default usePosition;
