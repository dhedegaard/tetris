import { createSelector } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { Block, blocksActions } from "../slices/blocks";
import { directionActions } from "../slices/direction";
import { gamestateActions } from "../slices/gamestate";
import { levelActions, selectLevel } from "../slices/level";
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

export const clearFilledRows =
  () =>
  async (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
    return batch(() => {
      let rowsCleared = 0;

      // The scoring later depends on the level before clearing rows, so we
      // calculate the level beforehand.
      const level = selectLevel(getState());

      while (true) {
        const state = getState();
        const [filledRow] = selectFilledRows(state);
        if (filledRow == null) {
          break;
        }

        // Clear the filled rows and increment.
        dispatch(blocksActions.clearRow(filledRow));
        rowsCleared++;
      }

      // Increase the score based on the nubmer of rows cleared and the current
      // level.
      if (rowsCleared > 0) {
        dispatch(levelActions.incrementRowsCleared(rowsCleared));
        dispatch(
          scoreActions.increaseScore(calculateScore(level, rowsCleared))
        );
      }

      return rowsCleared;
    });
  };

const selectBlocks = (state: TetrisStoreState) => state.blocks.blocks;
const selectFilledRows = createSelector(selectBlocks, (blocks) => {
  if (blocks.length === 0) {
    return [];
  }

  const minY = blocks.reduce((min, block) => Math.min(min, block.y), Infinity);
  const maxY = blocks.reduce((max, block) => Math.max(max, block.y), -Infinity);
  const result = [];
  for (let y = maxY; y >= minY; y--) {
    const rowBlocks = blocks.filter((e) => e.y === y);
    if (rowBlocks.length === 10) {
      result.push(y);
      // move the blocks from the current
    }
  }
  return result;
});

const calculateScore = (level: number, linesCleared: number): number => {
  switch (linesCleared) {
    case 1:
      return 40 * (level + 1);
    case 2:
      return 100 * (level + 1);
    case 3:
      return 300 * (level + 1);
    case 4:
      return 1200 * (level + 1);
  }
  throw new Error(
    "Unhandled case, level:" + level + ", linesCleared:" + linesCleared
  );
};

export const attemptPersistBlocks =
  (blocks: Block[]) =>
  async (
    dispatch: TetrisStoreDispatch,
    getState: () => TetrisStoreState
  ): Promise<boolean> => {
    const state = getState();
    if (state.gamestate.gamestate === "gameover") {
      return false;
    }

    if (
      blocks.some((e) =>
        state.blocks.blocks.some((f) => e.x === f.x && e.y === f.y)
      )
    ) {
      // One or more blocks overlap with existing blocks, the game is over.
      dispatch(gamestateActions.setGameover());
      return false;
    }

    batch(() => {
      // Persist the blocks and return true.
      blocks.forEach((block) => dispatch(blocksActions.persistBlock(block)));

      // Reset various things and go to the next shape.
      dispatch(positionActions.resetPosition());
      dispatch(directionActions.resetDirection());
      dispatch(shapeActions.nextShape());
    });

    return true;
  };
