import { useMemo, useState } from "react";

export type Gamestate = "alive" | "gameover";

const useGamestate = () => {
  const [gamestate, setGamestate] = useState<Gamestate>("alive");

  return useMemo(
    () => ({
      gamestate,
      setAlive: () => setGamestate("alive"),
      setGameover: () => setGamestate("gameover"),
    }),
    [gamestate]
  );
};

export default useGamestate;
