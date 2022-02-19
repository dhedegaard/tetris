import {
  MutableRefObject,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { useSwipeable } from "react-swipeable";
import { Coordinate, Coordinates } from "../components/ShapeDrawer";
import { Direction, Shapes } from "../components/shapes";
import { initialState, tetrisReducer } from "./reducer";
import useBlocks, { Block } from "./useBlocks";
import useDirection from "./useDirection";
import useGamestate, { Gamestate } from "./useGamestate";
import useKeyboard, { Player } from "./useKeyboard";
import useLevel, { calculateTickRate } from "./useLevel";
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
  const [state, dispatch] = useReducer(tetrisReducer, initialState);

  const { gamestate, setGameover, setAlive } = useGamestate(state, dispatch);
  const { position, moveLeft, moveRight, moveDown, resetPosition } =
    usePosition();
  const { shape, nextShape, peekShapes } = useShape();
  const { direction, resetDirection, setNextDirection } = useDirection();
  const { score, increaseScore, resetScore } = useScore();
  const {
    blocks,
    addBlocks,
    clearFilledRows,
    isFreePositions,
    clearAllBlocks,
  } = useBlocks(setGameover);
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
      addBlocks(blocksToPersist);
      const rowsCleared = clearFilledRows();
      if (rowsCleared > 0) {
        increaseScore(calculateScore(level, rowsCleared));
        incrementRowsCleared(rowsCleared);
      }
      resetPosition();
      resetDirection();
      nextShape();
      setTemporaryTick(undefined); // Disable any fast temp ticks.
      setTick(calculateTickRate(level) * 1000);
    },
    // TODO: Fix circular dependency later :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      addBlocks,
      clearFilledRows,
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
