import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import gamestate from "./slices/gamestate";
import position from "./slices/position";

const tetrisStore = configureStore({
  reducer: {
    gamestate,
    position,
  },
});

export default tetrisStore;

export type TetrisStoreState = typeof tetrisStore extends EnhancedStore<infer S>
  ? S
  : never;
