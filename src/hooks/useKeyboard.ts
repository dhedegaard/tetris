import { useEffect, useMemo } from "react";
import { StateRef } from ".";
import { calculateCoordinates, nextDirection } from "../components/shapes";
import { useTetrisDispatch } from "../store/tetris";
import {
  moveCurrentShapeLeft,
  moveCurrentShapeRight,
} from "../store/actions/game";

export interface Keybinds {
  moveLeft: string;
  moveRight: string;
  rotate: string;
  moveDown: string;
}

export const keyboard1: Keybinds = {
  moveLeft: "ArrowLeft",
  moveRight: "ArrowRight",
  rotate: "ArrowUp",
  moveDown: "ArrowDown",
};

export const keyboard2: Keybinds = {
  moveLeft: "a",
  moveRight: "d",
  rotate: "w",
  moveDown: "s",
};

const getKeybinds = (player: Player): Keybinds =>
  ((
    {
      keyboard1,
      keyboard2,
    } as { [key in Player]: Keybinds }
  )[player]);

export type Player = "keyboard1" | "keyboard2";

const useKeyboard = (
  stateRef: StateRef,
  moveLeft: () => void,
  moveRight: () => void,
  setNextDirection: () => void,
  setMoveToBottom: (moveToBottom: boolean) => void,
  newGame: () => void,
  player: Player = "keyboard1"
) => {
  const keybinds = useMemo(() => getKeybinds(player), [player]);
  const dispatch = useTetrisDispatch();

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      if (evt.repeat) {
        return;
      }

      const {
        position,
        direction,
        shape: { shape },
        isFreePositions,
        gamestate,
      } = stateRef.current;
      // If the game is over, allow a different set of keybinds.
      if (gamestate === "gameover") {
        switch (evt.key) {
          case "r":
            newGame();
        }
        return;
      }

      switch (evt.key) {
        case keybinds.moveLeft:
          dispatch(moveCurrentShapeLeft());
          break;

        case keybinds.moveRight:
          dispatch(moveCurrentShapeRight());
          break;

        case keybinds.rotate: {
          // up
          const newPositions = calculateCoordinates(shape, {
            direction: nextDirection(direction),
            x: position.x,
            y: position.y,
          });
          if (isFreePositions(newPositions)) {
            setNextDirection();
          }
          break;
        }
        case keybinds.moveDown: {
          // down
          setMoveToBottom(true);
          break;
        }
      }
    };
    const keyupHandler = (evt: KeyboardEvent) => {
      switch (evt.key) {
        case keybinds.moveDown: {
          // down
          setMoveToBottom(false);
          break;
        }
      }
    };

    document.addEventListener("keydown", keydownHandler, { passive: true });
    document.addEventListener("keyup", keyupHandler, { passive: true });
    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, [
    keybinds,
    moveLeft,
    moveRight,
    newGame,
    setMoveToBottom,
    setNextDirection,
    stateRef,
  ]);
};

export default useKeyboard;
