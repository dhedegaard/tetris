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

type SpawnState = Pick<TetrisState, 'position' | 'direction'>

/** Where and how each new piece starts. */
export const spawnState = () =>
  ({ position: { x: 4, y: 1 }, direction: 'RIGHT' }) satisfies SpawnState

export const createInitialState = () =>
  ({
    gamestate: 'alive',
    ...spawnState(),
    // Deterministic so the static HTML matches the first client render; the
    // client shuffles it on mount.
    shapeQueue: getInitialShapes(),
    hasRandomizedInitialQueue: false,
    score: 0,
    rowsCleared: 0,
    blocks: [],
  }) satisfies TetrisState

export const createTetrisStore = (initialState: Partial<TetrisState> = {}): TetrisStore =>
  createStore<TetrisState>()(() => ({ ...createInitialState(), ...initialState }))

export const tetrisStore = createTetrisStore()

export const useTetrisStore = <T>(selector: (state: TetrisState) => T): T =>
  useStore(tetrisStore, selector)
