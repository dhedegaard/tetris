import { useCallback, useMemo } from "react";
import { Direction } from "../components/shapes";
import { positionActions } from "../store/slices/position";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";

const selectDirection = (state: TetrisStoreState) => state.position.position;

const usePosition = () => {
  const dispatch = useTetrisDispatch();
  const position = useTetrisSelector(selectDirection);

  const movePosition = useCallback(
    (direction: Direction) =>
      dispatch(
        positionActions.movePosition({
          dx:
            direction === Direction.LEFT
              ? -1
              : direction === Direction.RIGHT
              ? 1
              : 0,
          dy:
            direction === Direction.DOWN
              ? 1
              : direction === Direction.UP
              ? -1
              : 0,
        })
      ),
    [dispatch]
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

  return useMemo(
    () => ({ position, moveLeft, moveRight, moveDown }),
    [moveDown, moveLeft, moveRight, position]
  );
};

export default usePosition;
