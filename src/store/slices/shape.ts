import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { getRandomShapes, ShapeElement, SHAPES } from "../../components/shapes";
import { TetrisStoreState } from "../tetris";

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
