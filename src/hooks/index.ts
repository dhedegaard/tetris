/* eslint-disable react-hooks/exhaustive-deps */
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { Coordinates } from "../components/ShapeDrawer";
import { Direction, Shapes } from "../components/shapes";
import {
  attemptPersistBlocks,
  Block,
  clearFilledRows,
  Coordinate,
} from "../store/slices/blocks";
import { selectTickrate } from "../store/slices/level";
import { useTetrisDispatch } from "../store/tetris";
import useBlocks from "./useBlocks";
import useDirection from "./useDirection";
import useGamestate, { Gamestate } from "./useGamestate";
import useKeyboard, { Player } from "./useKeyboard";
import useLevel from "./useLevel";
import usePosition from "./usePosition";
import useScore, { calculateScore } from "./useScore";
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

  const { gamestate, setAlive } = useGamestate();
  const { position, moveLeft, moveRight, moveDown, resetPosition } =
    usePosition();
  const { shape, nextShape, peekShapes } = useShape();
  const { direction, resetDirection, setNextDirection } = useDirection();
  const { score, increaseScore, resetScore } = useScore();
  const { blocks, addBlocks, isFreePositions, clearAllBlocks } = useBlocks();
  const { level, incrementRowsCleared, resetLevel } = useLevel();

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

  /* Call this when we're ready to persist blocks. */
  const persistBlock = useCallback(
    (blocksToPersist: Block[]) => {
      dispatch(attemptPersistBlocks(blocksToPersist)).then((success) => {
        // TODO: Handle in the thunked action instead.
        if (success) {
          setTemporaryTick(undefined);
          return dispatch(clearFilledRows());
        }
      });
    },
    [
      dispatch,
      addBlocks,
      increaseScore,
      incrementRowsCleared,
      level,
      nextShape,
      resetDirection,
      resetPosition,
    ]
  );

  // Handle ticks
  const { setTick, setTemporaryTick, resetTick } = useTick(
    stateRef,
    moveDown,
    persistBlock
  );

  // When the tickRate in the store changes, update the hook.
  // NOTE: Refactor later.
  const tickRate = useSelector(selectTickrate);
  useEffect(() => {
    setTick(tickRate * 1000);
  }, [tickRate]);

  /* Start a new game, setup the board again. */
  const newGame = useCallback(() => {
    clearAllBlocks();
    nextShape();
    resetPosition();
    resetDirection();
    setAlive();
    resetLevel();
    resetScore();
    resetTick();
  }, [
    clearAllBlocks,
    nextShape,
    resetDirection,
    resetLevel,
    resetPosition,
    resetScore,
    resetTick,
    setAlive,
  ]);

  /* While the next position is free, move down fast. */
  const setMoveToBottom = useCallback(
    (moveToBottom: boolean) => {
      setTemporaryTick(moveToBottom ? 40 : undefined);
    },
    [setTemporaryTick]
  );

  // Handle keyboard events.
  useKeyboard(
    stateRef,
    moveLeft,
    moveRight,
    setNextDirection,
    setMoveToBottom,
    newGame,
    player
  );

  const swipeableHandler = useSwipeable({
    onSwipedDown: () => setMoveToBottom(true),
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
    onSwipedUp: () => setNextDirection(),
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
