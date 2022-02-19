import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const INITIAL_TICKS = 800;

const tickSlice = createSlice({
  name: "tick",
  initialState: {
    temporateTick: undefined as undefined | number,
    tick: INITIAL_TICKS,
  },
  reducers: {
    resetTickRate: (state) => {
      state.tick = 800;
      state.temporateTick = undefined;
    },
    setTickRate: (state, action: PayloadAction<number>) => {
      state.tick = action.payload;
    },
    clearTemporaryTick: (state) => {
      state.temporateTick = undefined;
    },
    setTemporaryTick: (state, action: PayloadAction<number>) => {
      state.temporateTick = action.payload;
    },
  },
});

export const tickActions = tickSlice.actions;

export default tickSlice.reducer;
