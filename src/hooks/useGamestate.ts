import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gamestateActions } from "../store/slices/gamestate";
import { TetrisStoreState } from "../store/tetris";

const selectGamestate = (state: TetrisStoreState) => state.gamestate.gamestate;

export type Gamestate = "alive" | "gameover";

const useGamestate = () => {
  const gamestate = useSelector(selectGamestate);
  const dispatch = useDispatch();

  const setAlive = useCallback(
    () => dispatch(gamestateActions.setAlive()),
    [dispatch]
  );
  const setGameover = useCallback(
    () => dispatch(gamestateActions.setGameover()),
    [dispatch]
  );

  return useMemo(
    () => ({
      gamestate,
      setAlive,
      setGameover,
    }),
    [setAlive, setGameover, gamestate]
  );
};

export default useGamestate;
