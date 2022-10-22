import { useMemo } from "react";
import useShape from "./useShape";

const useShapeBounds = () => {
  const { concretePositions } = useShape();

  return useMemo(
    () => ({
      leftBottomElement: concretePositions.sort((a, b) => {
        if (a.x === b.x) {
          // Sort by bottom element for equal x values first (ie highest
          // y value).
          return b.y - a.y;
        }
        // Find the left most elements.
        return a.x - b.x;
      })[0],
    }),
    [concretePositions]
  );
};

export default useShapeBounds;
