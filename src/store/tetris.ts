import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import gamestate from "./slices/gamestate";
import position from "./slices/position";

const tetrisStore = configureStore({
  reducer: {
    gamestate,
    position,
  },
});

export default tetrisStore;

export type TetrisStoreState = ReturnType<typeof tetrisStore["getState"]>;

export type TetrisStoreDispatch = typeof tetrisStore.dispatch;

export const useTetrisDispatch = () => useDispatch<TetrisStoreDispatch>();
export const useTetrisSelector: TypedUseSelectorHook<TetrisStoreState> =
  useSelector;
