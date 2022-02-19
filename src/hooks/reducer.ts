import { Dispatch, Reducer } from "react";

export interface TetrisState {
  gamestate: "alive" | "gameover";
}
export type TetrisDispatch = Dispatch<Actions>;

type Actions = { type: "SET_ALIVE" } | { type: "SET_GAMEOVER" };

export const tetrisReducer: Reducer<TetrisState, Actions> = (
  state,
  actions
) => {
  switch (actions.type) {
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
    default:
      // @ts-expect-error
      throw new TypeError(`Unknown action type: ${actions.type}`);
  }
};

export const initialState: TetrisState = {
  gamestate: "alive",
};
