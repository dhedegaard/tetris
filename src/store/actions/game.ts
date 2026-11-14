import {
  calculateCoordinates,
  colorFromShape,
  type Direction,
  getRandomShapes,
  nextDirection,
  type ShapeProps,
} from '../../components/shapes'
import { assertNever } from '../../lib/assert-never'
import {
  type Block,
  type Coordinate,
  withoutRow,
  withUpsertedBlock,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  sameCell,
} from '../slices/blocks'
import { selectLevel, selectTickrate } from '../slices/level'
import { advanceShapeQueue, selectCurrentShape } from '../slices/shape'
import { createInitialState, spawnState, type TetrisState, type TetrisStore } from '../tetris'

type TetrisUpdate = Partial<TetrisState>

interface MoveTarget extends Coordinate {
  direction: Direction
}

export type MoveOperation = 'LEFT' | 'RIGHT' | 'DOWN' | 'ROTATE'

const randomQueue = () =>
  ({ shapeQueue: getRandomShapes(), hasRandomizedInitialQueue: true }) satisfies TetrisUpdate

export const startNewGame = (store: TetrisStore) => {
  store.setState({ ...createInitialState(), ...randomQueue() } satisfies TetrisState)
}

/** Replaces the deterministic server-rendered queue with a random one, once. */
export const randomizeInitialQueue = (store: TetrisStore) => {
  if (store.getState().hasRandomizedInitialQueue) {
    return
  }
  store.setState(randomQueue())
}

const clearFilledRows = (store: TetrisStore) => {
  const state = store.getState()
  let { blocks } = state
  let rowsCleared = 0
  for (let row = findFilledRow(blocks); row != null; row = findFilledRow(blocks)) {
    blocks = withoutRow(blocks, row)
    rowsCleared++
  }

  if (rowsCleared > 0) {
    // Score with the level from before these rows count towards it.
    store.setState({
      blocks,
      rowsCleared: state.rowsCleared + rowsCleared,
      score: state.score + calculateScore(selectLevel(state), rowsCleared),
    } satisfies TetrisUpdate)
  }
}

/** Any full row; the order rows are cleared in doesn't matter. */
const findFilledRow = (blocks: readonly Block[]): number | undefined => {
  const counts = new Map<number, number>()
  for (const { y } of blocks) {
    const count = (counts.get(y) ?? 0) + 1
    if (count === BOARD_WIDTH) {
      return y
    }
    counts.set(y, count)
  }
  return undefined
}

const calculateScore = (level: number, linesCleared: number): number => {
  switch (linesCleared) {
    case 1:
      return 40 * (level + 1)
    case 2:
      return 100 * (level + 1)
    case 3:
      return 300 * (level + 1)
    case 4:
      return 1200 * (level + 1)
  }
  throw new Error(
    `Unhandled case, level:${level.toString()}, linesCleared:${linesCleared.toString()}`
  )
}

/** Lands the current piece, clears full rows and spawns the next piece. */
const landPiece = (store: TetrisStore, blocks: readonly Block[]) => {
  const state = store.getState()
  store.setState({
    blocks: [...state.blocks, ...blocks],
    ...spawnState(),
    shapeQueue: advanceShapeQueue(state.shapeQueue),
  } satisfies TetrisUpdate)
  clearFilledRows(store)

  const newState = store.getState()
  const newCurrentShape = selectCurrentShape(newState)
  const newShapeBlocks = calculateCoordinates(newCurrentShape.shape, {
    direction: newState.direction,
    x: newState.position.x,
    y: newState.position.y,
  } satisfies ShapeProps)
  if (!arePositionsFree(newShapeBlocks, newState.blocks)) {
    const newBlockColor = colorFromShape(newCurrentShape.shape)
    store.setState({
      blocks: newShapeBlocks.reduce<readonly Block[]>(
        (acc, block) => withUpsertedBlock(acc, { ...block, color: newBlockColor } satisfies Block),
        newState.blocks
      ),
      gamestate: 'gameover',
    } satisfies TetrisUpdate)
  }
}

/** Attempts the move, if there's space. */
export const attemptToDoMove = (store: TetrisStore, operation: MoveOperation) => {
  const state = store.getState()
  if (state.gamestate !== 'alive') {
    return
  }

  const { x, y } = state.position
  const target = ((): MoveTarget => {
    switch (operation) {
      case 'LEFT':
        return { x: x - 1, y, direction: state.direction } satisfies MoveTarget
      case 'RIGHT':
        return { x: x + 1, y, direction: state.direction } satisfies MoveTarget
      case 'DOWN':
        return { x, y: y + 1, direction: state.direction } satisfies MoveTarget
      case 'ROTATE':
        return { x, y, direction: nextDirection(state.direction) } satisfies MoveTarget
      default:
        return assertNever(operation satisfies never)
    }
  })()

  if (
    !arePositionsFree(calculateCoordinates(selectCurrentShape(state).shape, target), state.blocks)
  ) {
    return
  }
  store.setState({
    position: { x: target.x, y: target.y },
    direction: target.direction,
  } satisfies TetrisUpdate)
}

export const moveGoToBottom = (store: TetrisStore) => {
  while (doTick(store) === 'moved-down') {}
}

const doTick = (store: TetrisStore): 'moved-down' | 'persisted-and-new-shape' | 'not-alive' => {
  const state = store.getState()
  if (state.gamestate !== 'alive') {
    return 'not-alive'
  }

  const { direction, position, blocks } = state
  const currentShape = selectCurrentShape(state)

  // Calculate the new position of the currently active shape.
  const newPositions = calculateCoordinates(currentShape.shape, {
    direction,
    x: position.x,
    y: position.y + 1,
  } satisfies ShapeProps)

  // Move down if space is free.
  if (arePositionsFree(newPositions, blocks)) {
    store.setState({ position: { x: position.x, y: position.y + 1 } } satisfies TetrisUpdate)
    return 'moved-down'
  }

  // Otherwise, persist and go to the next shape.
  const blockColor = colorFromShape(currentShape.shape)
  landPiece(
    store,
    calculateCoordinates(currentShape.shape, {
      direction,
      x: position.x,
      y: position.y,
    } satisfies ShapeProps).map((block) => ({ ...block, color: blockColor }) satisfies Block)
  )
  return 'persisted-and-new-shape'
}

const arePositionsFree = (positions: readonly Coordinate[], blocks: readonly Block[]): boolean =>
  positions.every(
    (e) =>
      e.x >= 0 && e.x < BOARD_WIDTH && e.y < BOARD_HEIGHT && !blocks.some((f) => sameCell(e, f))
  )

/** Starts the requestAnimationFrame game loop; returns a function that stops it. */
export const runTicks = (store: TetrisStore): (() => void) => {
  let cancelled = false
  void tickLoop(store, () => cancelled)
  return () => {
    cancelled = true
  }
}

const tickLoop = async (store: TetrisStore, isCancelled: () => boolean) => {
  let lastTick = Date.now()
  let lastY = store.getState().position.y
  while (await rafPromise()) {
    const now = Date.now()
    const state = store.getState()

    if (isCancelled()) {
      break
    }

    // If we moved down, reset the last tick.
    if (lastY !== state.position.y) {
      lastY = state.position.y
      lastTick = Date.now()
      continue
    }

    const tickrate = selectTickrate(state)
    const delta = now - lastTick
    if (delta >= tickrate) {
      lastTick += Math.floor(delta / tickrate) * tickrate
      doTick(store)
    }
  }
}

const rafPromise = (): Promise<boolean> =>
  new Promise<boolean>((resolve) => {
    requestAnimationFrame(() => {
      resolve(true)
    })
  })
