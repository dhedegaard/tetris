import { useSwipeable } from "react-swipeable";
import {
  moveCurrentShapeLeft,
  moveCurrentShapeRight,
  moveCurrentShapeToBottom,
  rotateCurrentShape,
} from "../store/actions/game";
import { useTetrisDispatch } from "../store/tetris";

export const useSwipe = () => {
  const dispatch = useTetrisDispatch();

  useSwipeable({
    onSwipedDown: () => dispatch(moveCurrentShapeToBottom()),
    onSwipedLeft: () => dispatch(moveCurrentShapeLeft()),
    onSwipedRight: () => dispatch(moveCurrentShapeRight()),
    onSwipedUp: () => dispatch(rotateCurrentShape()),
  });
};
