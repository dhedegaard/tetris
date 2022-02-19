import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tickSlice = createSlice({
  name: "tick",
  initialState: {
    temporateTick: undefined as undefined | number,
  },
  reducers: {
    resetTickRate: (state) => {
      state.temporateTick = undefined;
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
