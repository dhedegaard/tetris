import { useCallback, useEffect, useMemo } from "react";
import { StateRef } from ".";
import { calculateCoordinates, colorFromShape } from "../components/shapes";
import { attemptPersistBlocks, clearFilledRows } from "../store/slices/blocks";
import { selectTickrate } from "../store/slices/level";
import { tickActions } from "../store/slices/tick";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";
import useInterval from "./useInterval";

const tickSelector = (state: TetrisStoreState) => state.tick.tick;
const temporaryTickSelector = (state: TetrisStoreState) =>
  state.tick.temporateTick;

const useTick = (stateRef: StateRef, moveDown: () => void) => {
  const dispatch = useTetrisDispatch();

  const tick = useTetrisSelector(tickSelector);
  const temporaryTick = useTetrisSelector(tickSelector);

  // When the tickRate in the store changes, update it.
  const tickRate = useTetrisSelector(selectTickrate);
  useEffect(() => {
    dispatch(tickActions.setTickRate(tickRate * 1000));
  }, [dispatch, tickRate]);

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
    dispatch(
      attemptPersistBlocks(
        oldPositions.map((block) => ({
          ...block,
          color: blockColor,
        }))
      )
    ).then((success) => {
      if (success) {
        dispatch(tickActions.clearTemporaryTick());
        return dispatch(clearFilledRows());
      }
    });

    dispatch(tickActions.clearTemporaryTick());
  }, [dispatch, moveDown, stateRef]);

  const delay = useMemo(
    () =>
      stateRef.current.gamestate === "gameover"
        ? 1000
        : temporaryTick != null
        ? temporaryTick
        : tick,
    [stateRef, temporaryTick, tick]
  );

  useInterval(intervalCallback, delay);

  return useMemo(() => ({ tick }), [, tick]);
};

export default useTick;
