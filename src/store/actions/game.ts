import { batch } from "react-redux";
import { blocksActions } from "../slices/blocks";
import { directionActions } from "../slices/direction";
import { gamestateActions } from "../slices/gamestate";
import { levelActions } from "../slices/level";
import { positionActions } from "../slices/position";
import { scoreActions } from "../slices/score";
import { shapeActions } from "../slices/shape";
import { TetrisStoreDispatch, TetrisStoreState } from "../tetris";

export const startNewGame =
  () =>
  async (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
    batch(() => {
      dispatch(blocksActions.clearAllBlocks());
      dispatch(shapeActions.nextShape());
      dispatch(positionActions.resetPosition());
      dispatch(directionActions.resetDirection());
      dispatch(gamestateActions.setAlive());
      dispatch(scoreActions.resetScore());
      dispatch(levelActions.resetLevel());
    });
  };
