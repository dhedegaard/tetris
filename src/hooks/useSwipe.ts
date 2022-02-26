import { useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import {
  moveCurrentShapeLeft,
  moveCurrentShapeRight,
  moveCurrentShapeToBottom,
  rotateCurrentShape,
} from "../store/actions/game";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";

const gamestateSelector = (state: TetrisStoreState) =>
  state.gamestate.gamestate;

export const useSwipe = () => {
  const dispatch = useTetrisDispatch();
  const gamestate = useTetrisSelector(gamestateSelector);

  return useSwipeable(
    useMemo(
      () => ({
        onSwipedDown: () => dispatch(moveCurrentShapeToBottom()),
        onSwipedLeft: () => dispatch(moveCurrentShapeLeft()),
        onSwipedRight: () => dispatch(moveCurrentShapeRight()),
        onSwipedUp: () => dispatch(rotateCurrentShape()),
        preventDefaultTouchmoveEvent: gamestate === "alive",
      }),
      [dispatch, gamestate]
    )
  );
};
