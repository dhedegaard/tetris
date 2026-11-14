// Store-agnostic driver for game-logic tests. Only this file knows how the
// store is implemented, so the tests survive swapping the state library.
import { createShapeElement, Direction, Shape } from '../components/shapes'
import {
  attemptToDoMove,
  MoveOperation,
  moveGoToBottom,
  randomizeInitialQueue,
  runTicks,
  startNewGame,
} from '../store/actions/game'
import { Block, Coordinate } from '../store/slices/blocks'
import { selectLevel, selectTickrate } from '../store/slices/level'
import { selectCurrentShape, upcomingShapes } from '../store/slices/shape'
import { createTetrisStore, Gamestate, type TetrisState } from '../store/tetris'

export interface GameSetup {
  blocks?: Block[]
  queue?: Shape[]
  position?: Coordinate
  direction?: Direction
  score?: number
  rowsCleared?: number
  gamestate?: Gamestate
  /** Defaults to true, as if the client already randomized the queue. */
  isShapeQueueReady?: boolean
}

export interface GameSnapshot {
  gamestate: Gamestate
  position: Coordinate
  direction: Direction
  currentShape: Shape
  peekShapes: Shape[]
  queue: Shape[]
  isShapeQueueReady: boolean
  blocks: Block[]
  score: number
  level: number
  tickrate: number
}

export interface GameDriver {
  snapshot: () => GameSnapshot
  move: (operation: MoveOperation) => void
  dropToBottom: () => void
  startNewGame: () => void
  randomizeInitialQueue: () => void
  /** Starts the requestAnimationFrame tick loop; returns a cancel function. */
  runTicks: () => () => void
}

const sortBlocks = (blocks: readonly Block[]): Block[] =>
  [...blocks].sort((a, b) => a.y - b.y || a.x - b.x)

export const createGame = (setup: GameSetup = {}): GameDriver => {
  const { queue, isShapeQueueReady = true, ...rest } = setup
  const store = createTetrisStore({
    ...rest,
    ...(queue == null
      ? {}
      : { shapeQueue: queue.map((shape, i) => createShapeElement(shape, `test-${String(i)}`)) }),
    hasRandomizedInitialQueue: isShapeQueueReady,
  } satisfies Partial<TetrisState>)

  return {
    snapshot: () => {
      const state = store.getState()
      return {
        gamestate: state.gamestate,
        position: { ...state.position },
        direction: state.direction,
        currentShape: selectCurrentShape(state).shape,
        peekShapes: upcomingShapes(state.shapeQueue).map((e) => e.shape),
        queue: state.shapeQueue.map((e) => e.shape),
        isShapeQueueReady: state.hasRandomizedInitialQueue,
        blocks: sortBlocks(state.blocks),
        score: state.score,
        level: selectLevel(state),
        tickrate: selectTickrate(state),
      } satisfies GameSnapshot
    },
    move: (operation) => {
      attemptToDoMove(store, operation)
    },
    dropToBottom: () => {
      moveGoToBottom(store)
    },
    startNewGame: () => {
      startNewGame(store)
    },
    randomizeInitialQueue: () => {
      randomizeInitialQueue(store)
    },
    runTicks: () => {
      let cancelled = false
      void runTicks(store, () => cancelled)
      return () => {
        cancelled = true
      }
    },
  }
}

/** A full row at `y`, except for the given x columns. */
export const rowWithGaps = (y: number, gaps: number[], color = 'gray'): Block[] =>
  Array.from({ length: 10 }, (_, x) => x)
    .filter((x) => !gaps.includes(x))
    .map((x) => ({ x, y, color }))
