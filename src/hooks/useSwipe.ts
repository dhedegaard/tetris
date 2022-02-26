import { useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import {
  attemptToDoMove,
  moveCurrentShapeToBottom,
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
        onSwipedLeft: () => dispatch(attemptToDoMove("LEFT")),
        onSwipedRight: () => dispatch(attemptToDoMove("RIGHT")),
        onSwipedUp: () => dispatch(attemptToDoMove("ROTATE")),
        preventDefaultTouchmoveEvent: gamestate === "alive",
      }),
      [dispatch, gamestate]
    )
  );
};
