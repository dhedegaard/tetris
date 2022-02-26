import { createSelector } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { Coordinates } from "../../components/ShapeDrawer";
import {
  calculateCoordinates,
  colorFromShape,
  nextDirection,
} from "../../components/shapes";
import { Block, blocksActions } from "../slices/blocks";
import { directionActions } from "../slices/direction";
import { gamestateActions } from "../slices/gamestate";
import { levelActions, selectLevel } from "../slices/level";
import { positionActions } from "../slices/position";
import { scoreActions } from "../slices/score";
import { selectCurrentShape, shapeActions } from "../slices/shape";
import { tickActions } from "../slices/tick";
import { TetrisStoreDispatch, TetrisStoreState } from "../tetris";

export const startNewGame =
  () => (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
    if (getState().gamestate.gamestate !== "gameover") {
      return;
    }

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
  () => (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
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
  (
    dispatch: TetrisStoreDispatch,
    getState: () => TetrisStoreState
  ): boolean => {
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
      dispatch(tickActions.clearTemporaryTick());
      dispatch(positionActions.resetPosition());
      dispatch(directionActions.resetDirection());
      dispatch(shapeActions.nextShape());
      dispatch(clearFilledRows());
    });

    return true;
  };

/** Attemps to move left, if there's space. */
export const attemptToDoMove =
  (operation: "LEFT" | "RIGHT" | "ROTATE") =>
  (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
    const state = getState();
    const currentShape = selectCurrentShape(state);
    const {
      blocks: { blocks },
      position: { position },
      direction: { direction },
    } = state;

    // Determine the position after the move (calculateCoordinates).
    const newPositions = (() => {
      switch (operation) {
        case "LEFT":
          return calculateCoordinates(currentShape.shape, {
            direction,
            x: position.x - 1,
            y: position.y,
          });
        case "RIGHT":
          return calculateCoordinates(currentShape.shape, {
            direction,
            x: position.x + 1,
            y: position.y,
          });
        case "ROTATE":
          return calculateCoordinates(currentShape.shape, {
            direction: nextDirection(direction),
            x: position.x,
            y: position.y,
          });
        default:
          throw new TypeError(`Unknown operation: ${operation}`);
      }
    })();

    // Check if the spots are free in the new positions.
    if (arePositionsFree(newPositions, blocks)) {
      dispatch(positionActions.movePosition({ dx: -1, dy: 0 }));
    }
  };

export const moveCurrentShapeToBottom = () => (dispatch: TetrisStoreDispatch) =>
  dispatch(tickActions.setTemporaryTick(40));

export const moveGoToBottom = () => (dispatch: TetrisStoreDispatch) => {
  batch(() => {
    while (dispatch(doTick()) === "moved-down") {}
  });
};

export const doTick =
  () =>
  (
    dispatch: TetrisStoreDispatch,
    getState: () => TetrisStoreState
  ): "moved-down" | "persisted-and-new-shape" | "not-alive" => {
    const state = getState();
    if (state.gamestate.gamestate !== "alive") {
      return "not-alive";
    }

    const {
      direction: { direction },
      position: { position },
      blocks: { blocks },
    } = state;
    const currentShape = selectCurrentShape(state);

    // Calculate the new position of the currently active shape.
    const newPositions = calculateCoordinates(currentShape.shape, {
      direction,
      x: position.x,
      y: position.y + 1,
    });

    // Move down if space is free.
    if (arePositionsFree(newPositions, blocks)) {
      dispatch(positionActions.movePosition({ dx: 0, dy: +1 }));
      return "moved-down";
    }

    // Otherwise, persist and go to the next shape.
    const blockColor = colorFromShape(currentShape.shape);
    dispatch(
      attemptPersistBlocks(
        calculateCoordinates(currentShape.shape, {
          direction,
          x: position.x,
          y: position.y,
        }).map((block) => ({ ...block, color: blockColor }))
      )
    );
    return "persisted-and-new-shape";
  };

const arePositionsFree = (positions: Coordinates, blocks: Block[]): boolean =>
  positions.every(
    (e) =>
      e.x >= 0 &&
      e.x < 10 &&
      e.y < 20 &&
      !blocks.some((f) => f.x === e.x && f.y === e.y)
  );
