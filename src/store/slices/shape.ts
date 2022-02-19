import { createSlice } from "@reduxjs/toolkit";
import { getRandomShapes, SHAPES } from "../../components/shapes";
import { ShapeElement } from "../../hooks/reducer";
import { TetrisStoreState } from "../tetris";
import { createSelector } from "reselect";

const shapeSlice = createSlice({
  name: "shape",
  initialState: () => ({
    shapeQueue: [...getRandomShapes()] as ShapeElement[],
  }),
  reducers: {
    nextShape: (state) => {
      if (state.shapeQueue.length < SHAPES.length) {
        // If we're in danger of running out of shapes, add more.
        state.shapeQueue.push(...getRandomShapes());
      }
      state.shapeQueue.shift();
      return state;
    },
  },
});

export const shapeActions = shapeSlice.actions;

export default shapeSlice.reducer;

const selectShapeQueue = (state: TetrisStoreState) => state.shape.shapeQueue;

export const selectCurrentShape = createSelector(
  selectShapeQueue,
  (shapeQueue) => shapeQueue[0]!
);

export const selectPeekShapes = createSelector(selectShapeQueue, (shapeQueue) =>
  shapeQueue.slice(1, 3)
);
