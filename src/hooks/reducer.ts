import { Dispatch, Reducer, useReducer } from "react";

const DEFAULT_POSITION = Object.freeze({ x: 4, y: 1 });

export interface TetrisState {
  gamestate: "alive" | "gameover";
  position: { x: number; y: number };
}

export const initialState: TetrisState = {
  gamestate: "alive",
  position: DEFAULT_POSITION,
};

export type TetrisDispatch = Dispatch<Actions>;

type Actions =
  | { type: "SET_ALIVE" }
  | { type: "SET_GAMEOVER" }
  | { type: "MOVE_POSITION"; dx: number; dy: number }
  | { type: "RESET_POSITION" };

export const tetrisReducer: Reducer<TetrisState, Actions> = (state, action) => {
  switch (action.type) {
    case "SET_ALIVE":
      return {
        ...state,
        gamestate: "alive",
      };
    case "SET_GAMEOVER":
      return {
        ...state,
        gamestate: "gameover",
      };
    case "MOVE_POSITION":
      return {
        ...state,
        position: {
          x: state.position.x + action.dx,
          y: state.position.y + action.dy,
        },
      };
    case "RESET_POSITION":
      return {
        ...state,
        position: initialState.position,
      };
    default:
      // @ts-expect-error
      throw new TypeError(`Unknown action type: ${actions.type}`);
  }
};

export const useTetrisReducer = () => useReducer(tetrisReducer, initialState);
