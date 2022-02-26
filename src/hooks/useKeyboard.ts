import { useEffect, useMemo } from "react";
import {
  moveCurrentShapeLeft,
  moveCurrentShapeRight,
  moveCurrentShapeToBottom,
  rotateCurrentShape,
  startNewGame,
} from "../store/actions/game";
import { tickActions } from "../store/slices/tick";
import { useTetrisDispatch } from "../store/tetris";

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

const useKeyboard = (player: Player = "keyboard1") => {
  const keybinds = useMemo(() => getKeybinds(player), [player]);
  const dispatch = useTetrisDispatch();

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      if (evt.repeat) {
        return;
      }

      switch (evt.key) {
        case "r":
          dispatch(startNewGame());
          break;

        // left
        case keybinds.moveLeft:
          dispatch(moveCurrentShapeLeft());
          break;

        case keybinds.moveRight:
          // right
          dispatch(moveCurrentShapeRight());
          break;

        case keybinds.rotate:
          // up
          dispatch(rotateCurrentShape());
          break;

        case keybinds.moveDown: {
          // down
          dispatch(moveCurrentShapeToBottom());
          break;
        }
      }
    };
    const keyupHandler = (evt: KeyboardEvent) => {
      switch (evt.key) {
        case keybinds.moveDown: {
          // down
          dispatch(tickActions.clearTemporaryTick());
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
    dispatch,
    keybinds.moveDown,
    keybinds.moveLeft,
    keybinds.moveRight,
    keybinds.rotate,
  ]);
};

export default useKeyboard;
