import { useCallback, useMemo, useState } from "react";
import { TetrisDispatch, TetrisState } from "./reducer";

export type Gamestate = "alive" | "gameover";

const useGamestate = (state: TetrisState, dispatch: TetrisDispatch) => {
  const setAlive = useCallback(
    () => dispatch({ type: "SET_ALIVE" }),
    [dispatch]
  );
  const setGameover = useCallback(
    () => dispatch({ type: "SET_GAMEOVER" }),
    [dispatch]
  );

  return useMemo(
    () => ({
      gamestate: state.gamestate,
      setAlive,
      setGameover,
    }),
    [setAlive, setGameover, state.gamestate]
  );
};

export default useGamestate;
