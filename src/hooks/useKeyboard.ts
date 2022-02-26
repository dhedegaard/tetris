import { useCallback, useEffect } from "react";
import {
  attemptToDoMove,
  moveGoToBottom,
  startNewGame,
} from "../store/actions/game";
import { useTetrisDispatch } from "../store/tetris";

interface Keybinds {
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

  // Handle a key being pressed.
  const handleKey = useCallback(
    (key: string) => {
      switch (key) {
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
          dispatch(attemptToDoMove("DOWN"));
          break;

        case keybinds.goToBottom:
          // space
          dispatch(moveGoToBottom());
          break;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => handleKey(evt.key);
    document.addEventListener("keydown", keydownHandler, { passive: true });
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [dispatch, handleKey]);
};

export default useKeyboard;
