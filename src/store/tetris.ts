import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import blocks from "./slices/blocks";
import direction from "./slices/direction";
import gamestate from "./slices/gamestate";
import level from "./slices/level";
import position from "./slices/position";
import score from "./slices/score";
import shape from "./slices/shape";
import tick from "./slices/tick";

const tetrisStore = configureStore({
  reducer: {
    gamestate,
    position,
    shape,
    score,
    direction,
    level,
    blocks,
    tick,
  },
});

export default tetrisStore;

export type TetrisStoreState = ReturnType<typeof tetrisStore["getState"]>;

export type TetrisStoreDispatch = typeof tetrisStore.dispatch;

export const useTetrisDispatch = () => useDispatch<TetrisStoreDispatch>();
export const useTetrisSelector: TypedUseSelectorHook<TetrisStoreState> =
  useSelector;
