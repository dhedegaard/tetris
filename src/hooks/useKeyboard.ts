import { useCallback, useEffect, useRef } from "react";
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

const FIRST_REPEAT_INTERVAL = 400;
const REPEAT_INTERVAL = 75;

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

  const pressedKeys = useRef(new Set<string>());
  const handlePressedKey = useCallback(
    (key: string) => {
      let start = Date.now();
      let first = true;
      const handler: FrameRequestCallback = () => {
        if (!pressedKeys.current.has(key)) {
          return;
        }
        const now = Date.now();
        if (now - start > (first ? FIRST_REPEAT_INTERVAL : REPEAT_INTERVAL)) {
          start = now;
          first = false;
          handleKey(key);
        }
        requestAnimationFrame(handler);
      };
      requestAnimationFrame(handler);
    },
    [handleKey]
  );

  const pressKey = useCallback(
    (key: string) => {
      handleKey(key);
      pressedKeys.current.add(key);
      handlePressedKey(key);
    },
    [handleKey, handlePressedKey]
  );

  useEffect(() => {
    const keydownHandler = (evt: KeyboardEvent) => {
      if (!evt.repeat) {
        pressKey(evt.key);
      }
    };
    const keyupHandler = (evt: KeyboardEvent) => {
      pressedKeys.current.delete(evt.key);
    };
    document.addEventListener("keydown", keydownHandler, { passive: true });
    document.addEventListener("keyup", keyupHandler, { passive: true });
    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, [dispatch, handleKey]);
};

export default useKeyboard;
