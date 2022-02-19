import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { TetrisStoreDispatch, TetrisStoreState } from "../tetris";
import { directionActions } from "./direction";
import { gamestateActions } from "./gamestate";
import { levelActions, selectLevel } from "./level";
import { positionActions } from "./position";
import { scoreActions } from "./score";
import { shapeActions } from "./shape";

export interface Coordinate {
  x: number;
  y: number;
}

export interface Block extends Coordinate {
  color: string;
}

const blocksSlice = createSlice({
  name: "blocks",
  initialState: {
    blocks: [] as Block[],
  },
  reducers: {
    clearAllBlocks: (state) => {
      state.blocks = [];
    },
    persistBlock: (state, action: PayloadAction<Block>) => {
      state.blocks.push(action.payload);
    },
    clearBlock: (state, action: PayloadAction<Coordinate>) => {
      state.blocks = state.blocks.filter(
        (e) => e.x === action.payload.x && e.y === action.payload.y
      );
    },
    clearRow: (state, action: PayloadAction<number>) => {
      // Remove the given index.
      state.blocks = state.blocks.filter((e) => e.y !== action.payload);
      // Shift all the rows above one down.
      state.blocks = state.blocks.map((e) =>
        e.y >= action.payload ? e : { ...e, y: e.y + 1 }
      );
    },
  },
});

export const blocksActions = blocksSlice.actions;

export default blocksSlice.reducer;

/**
 * Returns true if the blocks were persisted, otherwise the
 */
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
