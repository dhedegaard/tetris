import { createSlice } from "@reduxjs/toolkit";
import { Direction, nextDirection } from "../../components/shapes";

const DEFAULT_DIRECTION = "RIGHT";

const directionSlice = createSlice<{
  direction: Direction;
}>({
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
