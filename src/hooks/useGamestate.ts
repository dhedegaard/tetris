import { useCallback, useMemo, useState } from "react";

export type Gamestate = "alive" | "gameover";

const useGamestate = () => {
  const [gamestate, setGamestate] = useState<Gamestate>("alive");

  const setAlive = useCallback(() => setGamestate("alive"), []);
  const setGameover = useCallback(() => setGamestate("gameover"), []);

  return useMemo(
    () => ({
      gamestate,
      setAlive,
      setGameover,
    }),
    [gamestate, setAlive, setGameover]
  );
};

export default useGamestate;
