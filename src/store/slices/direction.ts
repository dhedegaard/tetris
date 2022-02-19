import { createSlice } from "@reduxjs/toolkit";
import { Direction, nextDirection } from "../../components/shapes";

const DEFAULT_DIRECTION = Direction.RIGHT;

const directionSlice = createSlice({
  name: "direction",
  initialState: {
    direction: DEFAULT_DIRECTION,
  },
  reducers: {
    resetDirection: (state) => {
      state.direction = DEFAULT_DIRECTION;
    },
    rotateDirection: (state) => {
      state.direction = nextDirection(state.direction);
    },
  },
});

export const directionActions = directionSlice.actions;

export default directionSlice.reducer;
