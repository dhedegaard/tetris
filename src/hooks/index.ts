import { useEffect, useMemo } from "react";
import { runTicks, startNewGame } from "../store/actions/game";
import { runningActions } from "../store/slices/running";
import { useTetrisDispatch } from "../store/tetris";
import useBlocks from "./useBlocks";
import useDirection from "./useDirection";
import useGamepad from "./useGamepad";
import useGamestate from "./useGamestate";
import useKeyboard from "./useKeyboard";
import useLevel from "./useLevel";
import usePosition from "./usePosition";
import useScore from "./useScore";
import useShape from "./useShape";
import useShapeBounds from "./useShapeBounds";

/** A hook that contains all the logic regarding tetris. */
const useTetris = () => {
  const { gamestate } = useGamestate();
  const { position } = usePosition();
  const { shape, peekShapes } = useShape();
  const { direction } = useDirection();
  const { score } = useScore();
  const { blocks } = useBlocks();
  const { level } = useLevel();
  const shapeBounds = useShapeBounds();
  const dispatch = useTetrisDispatch();

  // Handle ticks
  useEffect(() => {
    dispatch(runTicks());
    return () => {
      dispatch(runningActions.setStopped());
    };
  }, [dispatch]);

  // Handle inputs.
  useKeyboard();
  useGamepad();

  return useMemo(
    () => ({
      blocks,
      direction,
      position,
      shape,
      gamestate,
      score,
      peekShapes,
      level,
      shapeBounds,
      startNewGame: () => dispatch(startNewGame()),
    }),
    [
      blocks,
      direction,
      dispatch,
      gamestate,
      level,
      peekShapes,
      position,
      score,
      shape,
      shapeBounds,
    ]
  );
};

export default useTetris;
