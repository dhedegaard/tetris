import { useCallback, useMemo } from "react";
import { gamestateActions } from "../store/slices/gamestate";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";

const selectGamestate = (state: TetrisStoreState) => state.gamestate.gamestate;

export type Gamestate = "alive" | "gameover";

const useGamestate = () => {
  const gamestate = useTetrisSelector(selectGamestate);
  const dispatch = useTetrisDispatch();

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
