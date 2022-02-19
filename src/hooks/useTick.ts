import { useCallback, useEffect, useMemo, useState } from "react";
import { StateRef } from ".";
import { calculateCoordinates, colorFromShape } from "../components/shapes";
import {
  attemptPersistBlocks,
  Block,
  clearFilledRows,
} from "../store/slices/blocks";
import { selectTickrate } from "../store/slices/level";
import { useTetrisDispatch, useTetrisSelector } from "../store/tetris";
import useInterval from "./useInterval";

const INITIAL_TICKS = 800;

const useTick = (stateRef: StateRef, moveDown: () => void) => {
  const dispatch = useTetrisDispatch();
  const [temporaryTick, setTemporaryTick] = useState<number | undefined>(
    undefined
  );
  const [tick, setTick] = useState(INITIAL_TICKS);

  // When the tickRate in the store changes, update the hook.
  // NOTE: Refactor later.
  const tickRate = useTetrisSelector(selectTickrate);
  useEffect(() => {
    setTick(tickRate * 1000);
  }, [tickRate]);

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
        setTemporaryTick(undefined);
        return dispatch(clearFilledRows());
      }
    });

    setTemporaryTick(undefined);
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

  const resetTick = useCallback(() => {
    setTick(INITIAL_TICKS);
    setTemporaryTick(undefined);
  }, []);

  return useMemo(
    () => ({ tick, setTemporaryTick, resetTick }),
    [resetTick, tick]
  );
};

export default useTick;
