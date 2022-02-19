import { Dispatch, Reducer, useReducer } from "react";
import { Coordinates } from "../components/ShapeDrawer";
import {
  Direction,
  getRandomShapes,
  nextDirection,
  Shapes,
  SHAPES,
} from "../components/shapes";

export interface ShapeElement {
  shape: Shapes;
  key: string;
  color: string;
  coordinates: Coordinates;
}

const DEFAULT_DIRECTION = Direction.RIGHT;

export interface TetrisState {
  shapeQueue: readonly ShapeElement[];
  currentShape: ShapeElement;
  direction: Direction;
  score: number;
}

const initialShapes = getRandomShapes();
export const initialState: TetrisState = {
  shapeQueue: initialShapes,
  currentShape: initialShapes[0]!,
  direction: DEFAULT_DIRECTION,
  score: 0,
};

export type TetrisDispatch = Dispatch<Actions>;

type Actions =
  | { type: "SET_ALIVE" }
  | { type: "SET_GAMEOVER" }
  | { type: "MOVE_POSITION"; dx: number; dy: number }
  | { type: "RESET_POSITION" }
  | { type: "NEXT_SHAPE" }
  | { type: "RESET_DIRECTION" }
  | { type: "ROTATE_DIRECTION" }
  | { type: "INCREASE_SCORE"; amount: number }
  | { type: "RESET_SCORE" };

export const tetrisReducer: Reducer<TetrisState, Actions> = (state, action) => {
  switch (action.type) {
    case "NEXT_SHAPE":
      const shapeQueue = state.shapeQueue.slice(1);
      return {
        ...state,
        shapeQueue:
          shapeQueue.length < SHAPES.length
            ? [...shapeQueue, ...getRandomShapes()]
            : shapeQueue,
        currentShape: shapeQueue[0]!,
      };
    case "RESET_DIRECTION":
      return {
        ...state,
        direction: DEFAULT_DIRECTION,
      };
    case "ROTATE_DIRECTION":
      return {
        ...state,
        direction: nextDirection(state.direction),
      };
    case "INCREASE_SCORE":
      return {
        ...state,
        score: state.score + action.amount,
      };
    case "RESET_SCORE":
      return {
        ...state,
        score: 0,
      };
    default:
      // @ts-expect-error
      throw new TypeError(`Unknown action type: ${actions.type}`);
  }
};

export const useTetrisReducer = () => useReducer(tetrisReducer, initialState);
