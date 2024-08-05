import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { blocksReducer } from './slices/blocks'
import { directionReducer } from './slices/direction'
import { gamestateReducer } from './slices/gamestate'
import { levelReducer } from './slices/level'
import { positionReducer } from './slices/position'
import { runningReducer } from './slices/running'
import { scoreReducer } from './slices/score'
import { shapeReducer } from './slices/shape'

export const tetrisStore = configureStore({
  reducer: {
    gamestate: gamestateReducer,
    position: positionReducer,
    shape: shapeReducer,
    score: scoreReducer,
    direction: directionReducer,
    level: levelReducer,
    blocks: blocksReducer,
    running: runningReducer,
  },
})

export type TetrisStoreState = ReturnType<(typeof tetrisStore)['getState']>

export type TetrisStoreDispatch = typeof tetrisStore.dispatch

export const useTetrisDispatch = () => useDispatch<TetrisStoreDispatch>()
export const useTetrisSelector: TypedUseSelectorHook<TetrisStoreState> = useSelector
