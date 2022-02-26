import { MutableRefObject, useMemo, useRef } from "react";
import { Coordinates } from "../components/ShapeDrawer";
import { Direction, Shapes } from "../components/shapes";
import { Coordinate } from "../store/slices/blocks";
import useBlocks from "./useBlocks";
import useDirection from "./useDirection";
import useGamestate, { Gamestate } from "./useGamestate";
import useKeyboard, { Player } from "./useKeyboard";
import useLevel from "./useLevel";
import usePosition from "./usePosition";
import useScore from "./useScore";
import useShape from "./useShape";
import { useSwipe } from "./useSwipe";
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
  const { gamestate } = useGamestate();
  const { position, moveDown } = usePosition();
  const { shape, peekShapes } = useShape();
  const { direction } = useDirection();
  const { score, increaseScore } = useScore();
  const { blocks, isFreePositions } = useBlocks();
  const { level } = useLevel();

  // Build a ref os state, for various cases.
  /** @deprecated */
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

  // Handle inputs.
  useKeyboard(player);
  useSwipe();

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
    }),
    [blocks, direction, gamestate, level, peekShapes, position, score, shape]
  );
};

export default useTetris;
