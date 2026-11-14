// Store-agnostic driver for game-logic tests. Only this file knows how the
// store is implemented, so the tests survive swapping the state library.
import {
  calculateCoordinates,
  colorFromShape,
  Direction,
  Shape,
  ShapeElement,
} from '../components/shapes'
import {
  attemptToDoMove,
  moveGoToBottom,
  randomizeInitialQueue,
  runTicks,
  startNewGame,
} from '../store/actions/game'
import { Block } from '../store/slices/blocks'
import { selectLevel, selectTickrate } from '../store/slices/level'
import { selectCurrentShape, selectPeekShapes } from '../store/slices/shape'
import { createTetrisStore } from '../store/tetris'

export interface GameSetup {
  blocks?: Block[]
  queue?: Shape[]
  position?: { x: number; y: number }
  direction?: Direction
  score?: number
  rowsCleared?: number
  gamestate?: 'alive' | 'gameover'
  /** Defaults to true, as if the client already randomized the queue. */
  isShapeQueueReady?: boolean
}

export interface GameSnapshot {
  gamestate: 'alive' | 'gameover'
  position: { x: number; y: number }
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
  move: (operation: 'LEFT' | 'RIGHT' | 'DOWN' | 'ROTATE') => void
  dropToBottom: () => void
  startNewGame: () => void
  randomizeInitialQueue: () => void
  /** Starts the requestAnimationFrame tick loop; returns a cancel function. */
  runTicks: () => () => void
}

const toShapeElement = (shape: Shape, index: number): ShapeElement =>
  ({
    shape,
    key: `test-${shape}-${String(index)}`,
    color: colorFromShape(shape),
    coordinates: calculateCoordinates(shape, { direction: 'RIGHT', x: 0, y: 0 }),
  }) satisfies ShapeElement

const sortBlocks = (blocks: readonly Block[]): Block[] =>
  [...blocks].sort((a, b) => a.y - b.y || a.x - b.x)

export const createGame = (setup: GameSetup = {}): GameDriver => {
  const store = createTetrisStore({
    ...(setup.gamestate == null ? {} : { gamestate: setup.gamestate }),
    ...(setup.position == null ? {} : { position: setup.position }),
    ...(setup.direction == null ? {} : { direction: setup.direction }),
    ...(setup.score == null ? {} : { score: setup.score }),
    ...(setup.rowsCleared == null ? {} : { rowsCleared: setup.rowsCleared }),
    ...(setup.blocks == null ? {} : { blocks: setup.blocks }),
    ...(setup.queue == null ? {} : { shapeQueue: setup.queue.map(toShapeElement) }),
    hasRandomizedInitialQueue: setup.isShapeQueueReady ?? true,
  })

  return {
    snapshot: () => {
      const state = store.getState()
      return {
        gamestate: state.gamestate,
        position: { ...state.position },
        direction: state.direction,
        currentShape: selectCurrentShape(state).shape,
        peekShapes: selectPeekShapes(state).map((e) => e.shape),
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
