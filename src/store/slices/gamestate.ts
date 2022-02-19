import { createSlice } from "@reduxjs/toolkit";

const gamestateSlice = createSlice({
  name: "gamestate",
  initialState: {
    gamestate: "alive" as "alive" | "gameover",
  },
  reducers: {
    setAlive: (state) => {
      state.gamestate = "alive";
    },
    setGameover: (state) => {
      state.gamestate = "gameover";
    },
  },
});

export const gamestateActions = gamestateSlice.actions;

export default gamestateSlice.reducer;
