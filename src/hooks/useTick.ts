import { createSelector } from "@reduxjs/toolkit";
import { useCallback, useMemo } from "react";
import { doTick } from "../store/actions/game";
import { selectTickrate } from "../store/slices/level";
import {
  TetrisStoreState,
  useTetrisDispatch,
  useTetrisSelector,
} from "../store/tetris";
import useGamestate from "./useGamestate";
import useInterval from "./useInterval";

const temporaryTickSelector = (state: TetrisStoreState) =>
  state.tick.temporateTick;
const currentTickSelector = createSelector(
  selectTickrate,
  temporaryTickSelector,
  (tick, temporaryTick) => temporaryTick ?? tick * 1000
);

const useTick = () => {
  const dispatch = useTetrisDispatch();
  const tick = useTetrisSelector(currentTickSelector);
  const { gamestate } = useGamestate();

  const intervalCallback = useCallback(() => dispatch(doTick()), [dispatch]);

  const delay = useMemo(
    () => (gamestate === "gameover" ? 1000 : tick),
    [gamestate, tick]
  );

  useInterval(intervalCallback, delay);

  return useMemo(() => ({ tick }), [, tick]);
};

export default useTick;
