import { MutableRefObject, useMemo } from "react";
import { Coordinates } from "../components/ShapeDrawer";
import { Direction, Shapes } from "../components/shapes";
import { startNewGame } from "../store/actions/game";
import { Coordinate } from "../store/slices/blocks";
import { useTetrisDispatch } from "../store/tetris";
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
  const { position } = usePosition();
  const { shape, peekShapes } = useShape();
  const { direction } = useDirection();
  const { score } = useScore();
  const { blocks } = useBlocks();
  const { level } = useLevel();
  const dispatch = useTetrisDispatch();

  // Handle ticks
  useTick();

  // Handle inputs.
  useKeyboard(player);
  const swipeableHandler = useSwipe();

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
      swipeableHandler,
    ]
  );
};

export default useTetris;
