import { useEffect } from "react";
import {
  attemptToDoMove,
  moveCurrentShapeToBottom,
  moveGoToBottom,
  startNewGame,
} from "../store/actions/game";
import { tickActions } from "../store/slices/tick";
import { useTetrisDispatch } from "../store/tetris";

export interface Keybinds {
  moveLeft: string;
  moveRight: string;
  rotate: string;
  moveDown: string;
  goToBottom: string;
  newGame: string;
}

export const keyboard1: Keybinds = {
  moveLeft: "ArrowLeft",
  moveRight: "ArrowRight",
  rotate: "ArrowUp",
  moveDown: "ArrowDown",
  goToBottom: " ",
  newGame: "r",
};
const keybinds = keyboard1;

const useKeyboard = () => {
  const dispatch = useTetrisDispatch();

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      if (evt.repeat) {
        return;
      }

      switch (evt.key) {
        case keybinds.newGame:
          // r
          dispatch(startNewGame());
          break;

        case keybinds.moveLeft:
          // left
          dispatch(attemptToDoMove("LEFT"));
          break;

        case keybinds.moveRight:
          // right
          dispatch(attemptToDoMove("RIGHT"));
          break;

        case keybinds.rotate:
          // up
          dispatch(attemptToDoMove("ROTATE"));
          break;

        case keybinds.moveDown:
          // down
          dispatch(moveCurrentShapeToBottom());
          break;

        case keybinds.goToBottom:
          // space
          dispatch(moveGoToBottom());
          break;
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
  }, [dispatch]);
};

export default useKeyboard;
