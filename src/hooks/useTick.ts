import { useCallback, useMemo, useState } from "react";
import { StateRef } from ".";
import { calculateCoordinates, colorFromShape } from "../components/shapes";
import { Block } from "./useBlocks";
import useInterval from "./useInterval";

const INITIAL_TICKS = 800;

const useTick = (
  stateRef: StateRef,
  moveDown: () => void,
  persistBlock: (position: Block[]) => void
) => {
  const [temporaryTick, setTemporaryTick] = useState<number | undefined>(
    undefined
  );
  const [tick, setTick] = useState(INITIAL_TICKS);

  const intervalCallback = useCallback(() => {
    const { shape, direction, position, isFreePositions, gamestate } =
      stateRef.current;

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
    persistBlock(
      oldPositions.map((block) => ({
        ...block,
        color: blockColor,
      }))
    );
    setTemporaryTick(undefined);
  }, [moveDown, persistBlock, stateRef]);

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
    () => ({
      tick,
      setTick,
      setTemporaryTick,
      resetTick,
    }),
    [resetTick, tick]
  );
};

export default useTick;
