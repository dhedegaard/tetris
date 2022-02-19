import { Dispatch, Reducer, useReducer } from "react";
import {
  Direction,
  getRandomShapes,
  nextDirection,
} from "../components/shapes";

const DEFAULT_DIRECTION = Direction.RIGHT;

export interface TetrisState {
  direction: Direction;
}

const initialShapes = getRandomShapes();
export const initialState: TetrisState = {
  direction: DEFAULT_DIRECTION,
};

export type TetrisDispatch = Dispatch<Actions>;

type Actions = { type: "RESET_DIRECTION" } | { type: "ROTATE_DIRECTION" };

export const tetrisReducer: Reducer<TetrisState, Actions> = (state, action) => {
  switch (action.type) {
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
    default:
      // @ts-expect-error
      throw new TypeError(`Unknown action type: ${actions.type}`);
  }
};

export const useTetrisReducer = () => useReducer(tetrisReducer, initialState);
