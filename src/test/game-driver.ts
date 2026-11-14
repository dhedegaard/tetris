// Store-agnostic driver for game-logic tests. Only this file knows how the
// store is implemented, so the tests survive swapping the state library.
import {
  calculateCoordinates,
  colorFromShape,
  Direction,
  Shape,
  ShapeElement,
} from '../components/shapes'
import { attemptToDoMove, moveGoToBottom, runTicks, startNewGame } from '../store/actions/game'
import { Block } from '../store/slices/blocks'
import { selectLevel, selectTickrate } from '../store/slices/level'
import { selectCurrentShape, selectPeekShapes, shapeActions } from '../store/slices/shape'
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
  const fresh = createTetrisStore().getState()
  const store = createTetrisStore({
    gamestate: { gamestate: setup.gamestate ?? 'alive' },
    position: { position: setup.position ?? fresh.position.position },
    direction: { direction: setup.direction ?? fresh.direction.direction },
    score: { score: setup.score ?? 0 },
    level: { rowsCleared: setup.rowsCleared ?? 0 },
    blocks: { blocks: setup.blocks ?? [] },
    shape: {
      shapeQueue: setup.queue?.map(toShapeElement) ?? fresh.shape.shapeQueue,
      hasRandomizedInitialQueue: setup.isShapeQueueReady ?? true,
    },
  })

  return {
    snapshot: () => {
      const state = store.getState()
      return {
        gamestate: state.gamestate.gamestate,
        position: { ...state.position.position },
        direction: state.direction.direction,
        currentShape: selectCurrentShape(state).shape,
        peekShapes: selectPeekShapes(state).map((e) => e.shape),
        queue: state.shape.shapeQueue.map((e) => e.shape),
        isShapeQueueReady: state.shape.hasRandomizedInitialQueue,
        blocks: sortBlocks(state.blocks.blocks),
        score: state.score.score,
        level: selectLevel(state),
        tickrate: selectTickrate(state),
      } satisfies GameSnapshot
    },
    move: (operation) => {
      store.dispatch(attemptToDoMove(operation))
    },
    dropToBottom: () => {
      store.dispatch(moveGoToBottom())
    },
    startNewGame: () => {
      store.dispatch(startNewGame())
    },
    randomizeInitialQueue: () => {
      store.dispatch(shapeActions.randomizeInitialQueue())
    },
    runTicks: () => {
      let cancelled = false
      void store.dispatch(runTicks(() => cancelled))
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
