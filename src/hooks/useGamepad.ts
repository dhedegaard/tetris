import { useCallback, useEffect, useState } from "react";

export const useGamepad = () => {
  const [gamepad, setGamepad] = useState<Gamepad | undefined>(undefined);

  useEffect(() => {
    const handler = ({ gamepad }: GamepadEvent) => setGamepad(gamepad);
    window.addEventListener("gamepadconnected", handler);
    return () => window.removeEventListener("gamepadconnected", handler);
  }, []);

  useEffect(() => {
    const handler = ({ gamepad }: GamepadEvent) => setGamepad(undefined);
    window.addEventListener("gamepaddisconnected", handler);
    return () => window.removeEventListener("gamepaddisconnected", handler);
  }, []);

  useCallback(() => {
    if (gamepad == null) {
      return;
    }
    console.log(gamepad);
  }, [gamepad]);
};
