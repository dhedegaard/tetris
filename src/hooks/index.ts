import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { Coordinates } from "../components/ShapeDrawer";
import { Direction, Shapes } from "../components/shapes";
import {
  moveCurrentShapeLeft,
  moveCurrentShapeRight,
  rotateCurrentShape,
  startNewGame,
} from "../store/actions/game";
import { Coordinate } from "../store/slices/blocks";
import { tickActions } from "../store/slices/tick";
import { useTetrisDispatch } from "../store/tetris";
import useBlocks from "./useBlocks";
import useDirection from "./useDirection";
import useGamestate, { Gamestate } from "./useGamestate";
import useKeyboard, { Player } from "./useKeyboard";
import useLevel from "./useLevel";
import usePosition from "./usePosition";
import useScore from "./useScore";
import useShape from "./useShape";
import useTick from "./useTick";

export type StateRef = MutableRefObject<{
  position: Coordinate;
  direction: Direction;
  shape: { shape: Shapes; key: string };
  gamestate: Gamestate;
  score: number;
  increaseScore: (amount: number) => void;
  isFreePositions: (newPositions: Coordinates) => boolean;
}>;

interface Input {
  player: Player;
}
/** A hook that contains all the logic regarding tetris. */
const useTetris = ({ player }: Input) => {
  const dispatch = useTetrisDispatch();
  const { gamestate } = useGamestate();
  const { position, moveDown } = usePosition();
  const { shape, peekShapes } = useShape();
  const { direction } = useDirection();
  const { score, increaseScore } = useScore();
  const { blocks, isFreePositions } = useBlocks();
  const { level } = useLevel();

  // Build a ref os state, for various cases.
  const stateRef: StateRef = useRef({
    position,
    direction,
    shape,
    gamestate,
    score,
    isFreePositions: () => {
      throw new Error("initial state ref");
    },
    increaseScore,
  });
  stateRef.current = {
    position,
    direction,
    shape,
    isFreePositions,
    gamestate,
    score,
    increaseScore,
  };

  // Handle ticks
  useTick(stateRef, moveDown);

  /* Start a new game, setup the board again. */
  const newGame = useCallback(() => dispatch(startNewGame()), [dispatch]);

  /* While the next position is free, move down fast. */
  const setMoveToBottom = useCallback(
    (moveToBottom: boolean) =>
      dispatch(
        moveToBottom
          ? tickActions.setTemporaryTick(40)
          : tickActions.clearTemporaryTick()
      ),
    [dispatch]
  );

  // Handle keyboard events.
  useKeyboard(setMoveToBottom, player);

  const swipeableHandler = useSwipeable({
    onSwipedDown: () => setMoveToBottom(true),
    onSwipedLeft: () => dispatch(moveCurrentShapeLeft()),
    onSwipedRight: () => dispatch(moveCurrentShapeRight()),
    onSwipedUp: () => dispatch(rotateCurrentShape()),
  });

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
      swipeableHandler,
      startNewGame: newGame,
    }),
    [
      blocks,
      direction,
      gamestate,
      level,
      newGame,
      peekShapes,
      position,
      score,
      shape,
      swipeableHandler,
    ]
  );
};

export default useTetris;
