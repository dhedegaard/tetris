import { useStore } from 'zustand'
import { createStore, type StoreApi } from 'zustand/vanilla'
import { type Direction, getInitialShapes, type ShapeElement } from '../components/shapes'
import type { Block, Coordinate } from './slices/blocks'

export type Gamestate = 'alive' | 'gameover'

export interface TetrisState {
  gamestate: Gamestate
  position: Coordinate
  direction: Direction
  shapeQueue: ShapeElement[]
  hasRandomizedInitialQueue: boolean
  score: number
  rowsCleared: number
  blocks: Block[]
}

export type TetrisStore = StoreApi<TetrisState>

export const DEFAULT_POSITION: Readonly<Coordinate> = Object.freeze({ x: 4, y: 1 })
export const DEFAULT_DIRECTION: Direction = 'RIGHT'

export const createTetrisStore = (initialState: Partial<TetrisState> = {}): TetrisStore =>
  createStore<TetrisState>()(() => ({
    gamestate: 'alive',
    position: { ...DEFAULT_POSITION },
    direction: DEFAULT_DIRECTION,
    // Deterministic so the static HTML matches the first client render; the
    // client shuffles it on mount.
    shapeQueue: getInitialShapes(),
    hasRandomizedInitialQueue: false,
    score: 0,
    rowsCleared: 0,
    blocks: [],
    ...initialState,
  }))

export const tetrisStore = createTetrisStore()

export const useTetrisStore = <T>(selector: (state: TetrisState) => T): T =>
  useStore(tetrisStore, selector)
