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
  const setNextDirection = useCallback(
    () => dispatch(directionActions.rotateDirection()),
    [dispatch]
  );

  return useMemo(
    () => ({
      direction,
      setNextDirection,
    }),
    [direction, setNextDirection]
  );
};

export default useDirections;
