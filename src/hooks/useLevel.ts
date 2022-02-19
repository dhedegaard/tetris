import { useMemo } from "react";
import { selectLevel } from "../store/slices/level";
import { useTetrisSelector } from "../store/tetris";

/** The level of the game */
const useLevel = () => {
  const level = useTetrisSelector(selectLevel);

  return useMemo(() => ({ level }), [level]);
};

export default useLevel;
