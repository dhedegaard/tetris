import { useCallback, useMemo } from "react";
import { directionActions } from "../store/slices/direction";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";

const selectDirection = (state: TetrisStoreState) => state.direction.direction;

const useDirections = () => {
  const direction = useTetrisSelector(selectDirection);
  const dispatch = useTetrisDispatch();
  const resetDirection = useCallback(
    () => dispatch(directionActions.resetDirection()),
    [dispatch]
  );
  const setNextDirection = useCallback(
    () => dispatch(directionActions.rotateDirection()),
    [dispatch]
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
