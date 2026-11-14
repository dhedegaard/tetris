import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { blocksReducer } from './slices/blocks'
import { directionReducer } from './slices/direction'
import { gamestateReducer } from './slices/gamestate'
import { levelReducer } from './slices/level'
import { positionReducer } from './slices/position'
import { scoreReducer } from './slices/score'
import { shapeReducer } from './slices/shape'

const rootReducer = combineReducers({
  gamestate: gamestateReducer,
  position: positionReducer,
  shape: shapeReducer,
  score: scoreReducer,
  direction: directionReducer,
  level: levelReducer,
  blocks: blocksReducer,
})

export type TetrisStoreState = ReturnType<typeof rootReducer>

export const createTetrisStore = (preloadedState?: Partial<TetrisStoreState>) =>
  configureStore({
    reducer: rootReducer,
    ...(preloadedState == null ? {} : { preloadedState }),
  })

export const tetrisStore = createTetrisStore()

export type TetrisStoreDispatch = typeof tetrisStore.dispatch

export const useTetrisDispatch = () => useDispatch<TetrisStoreDispatch>()
export const useTetrisSelector: TypedUseSelectorHook<TetrisStoreState> = useSelector
