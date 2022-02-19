import { createSelector } from "@reduxjs/toolkit";
import { useCallback, useMemo } from "react";
import { batch } from "react-redux";
import { StateRef } from ".";
import { calculateCoordinates, colorFromShape } from "../components/shapes";
import { attemptPersistBlocks, clearFilledRows } from "../store/actions/game";
import { selectTickrate } from "../store/slices/level";
import { tickActions } from "../store/slices/tick";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";
import useInterval from "./useInterval";

const temporaryTickSelector = (state: TetrisStoreState) =>
  state.tick.temporateTick;
const currentTickSelector = createSelector(
  selectTickrate,
  temporaryTickSelector,
  (tick, temporaryTick) => temporaryTick ?? tick * 1000
);

const useTick = (stateRef: StateRef, moveDown: () => void) => {
  const dispatch = useTetrisDispatch();
  const tick = useTetrisSelector(currentTickSelector);

  const intervalCallback = useCallback(() => {
    const {
      shape: { shape },
      direction,
      position,
      isFreePositions,
      gamestate,
    } = stateRef.current;

    // If the game is over, don't do anything.
    if (gamestate === "gameover") {
      return;
    }

    // Calculate the new position of the currently active shape.
    const newPositions = calculateCoordinates(shape, {
      direction,
      x: position.x,
      y: position.y + 1,
    });

    // If the next position is free, move down to it.
    if (isFreePositions(newPositions)) {
      moveDown();
      return;
    }

    // Otherwise, persist the blocks and start a new shape.
    const oldPositions = calculateCoordinates(shape, {
      direction,
      x: position.x,
      y: position.y,
    });
    const blockColor = colorFromShape(shape);
    batch(() => {
      dispatch(tickActions.clearTemporaryTick());
      dispatch(
        attemptPersistBlocks(
          oldPositions.map((block) => ({
            ...block,
            color: blockColor,
          }))
        )
      ).then((success) => {
        if (success) {
          batch(() => {
            dispatch(tickActions.clearTemporaryTick());
            dispatch(clearFilledRows());
          });
        }
      });
    });
  }, [dispatch, moveDown, stateRef]);

  const delay = useMemo(
    () => (stateRef.current.gamestate === "gameover" ? 1000 : tick),
    [stateRef, tick]
  );

  useInterval(intervalCallback, delay);

  return useMemo(() => ({ tick }), [, tick]);
};

export default useTick;
