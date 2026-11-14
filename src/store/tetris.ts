import { useStore } from 'zustand'
import { createStore, type StoreApi } from 'zustand/vanilla'
import { type Direction, getInitialShapes, type ShapeElement } from '../components/shapes'
import type { Block, Coordinate } from './slices/blocks'

export type Gamestate = 'alive' | 'gameover'

// Readonly so in-place mutation fails to compile: Zustand only re-renders on a
// new reference, and nothing checks for mutation at runtime.
export interface TetrisState {
  readonly gamestate: Gamestate
  readonly position: Readonly<Coordinate>
  readonly direction: Direction
  readonly shapeQueue: readonly ShapeElement[]
  readonly hasRandomizedInitialQueue: boolean
  readonly score: number
  readonly rowsCleared: number
  readonly blocks: readonly Readonly<Block>[]
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
  createStore<TetrisState>()(
    () => ({ ...createInitialState(), ...initialState }) satisfies TetrisState
  )

export const tetrisStore = createTetrisStore()

/** Puts the app's store back to a fresh game, for tests that render the app. */
export const resetTetrisStore = () => {
  tetrisStore.setState(createInitialState(), true)
}

export const useTetrisStore = <T>(selector: (state: TetrisState) => T): T =>
  useStore(tetrisStore, selector)
