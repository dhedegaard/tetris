import { Coordinates } from '../../components/ShapeDrawer'
import {
  calculateCoordinates,
  colorFromShape,
  getRandomShapes,
  nextDirection,
} from '../../components/shapes'
import { assertNever } from '../../lib/assert-never'
import { Block, withoutRow, withPersistedBlock, withUpsertedBlock } from '../slices/blocks'
import { selectLevel, selectTickrate } from '../slices/level'
import { advanceShapeQueue, selectCurrentShape } from '../slices/shape'
import { DEFAULT_DIRECTION, DEFAULT_POSITION, TetrisState, TetrisStore } from '../tetris'

export type MoveOperation = 'LEFT' | 'RIGHT' | 'DOWN' | 'ROTATE'

export const startNewGame = (store: TetrisStore) => {
  store.setState({
    blocks: [],
    shapeQueue: getRandomShapes(),
    hasRandomizedInitialQueue: true,
    position: { ...DEFAULT_POSITION },
    direction: DEFAULT_DIRECTION,
    gamestate: 'alive',
    score: 0,
    rowsCleared: 0,
  })
}

/** Replaces the deterministic server-rendered queue with a random one, once. */
export const randomizeInitialQueue = (store: TetrisStore) => {
  if (store.getState().hasRandomizedInitialQueue) {
    return
  }
  store.setState({ shapeQueue: getRandomShapes(), hasRandomizedInitialQueue: true })
}

const clearFilledRows = (store: TetrisStore) => {
  let rowsCleared = 0

  // The scoring later depends on the level before clearing rows, so we
  // calculate the level beforehand.
  const level = selectLevel(store.getState())

  for (;;) {
    const [filledRow] = findFilledRows(store.getState().blocks)
    if (filledRow == null) {
      break
    }

    store.setState((state) => ({ blocks: withoutRow(state.blocks, filledRow) }))
    rowsCleared++
  }

  if (rowsCleared > 0) {
    store.setState((state) => ({
      rowsCleared: state.rowsCleared + rowsCleared,
      score: state.score + calculateScore(level, rowsCleared),
    }))
  }

  return rowsCleared
}

const findFilledRows = (blocks: readonly Block[]): number[] => {
  if (blocks.length === 0) {
    return []
  }

  const minY = blocks.reduce((min, block) => Math.min(min, block.y), Infinity)
  const maxY = blocks.reduce((max, block) => Math.max(max, block.y), -Infinity)
  const result = []
  for (let y = maxY; y >= minY; y--) {
    const rowBlocks = blocks.filter((e) => e.y === y)
    if (rowBlocks.length === 10) {
      result.push(y)
    }
  }
  return result
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

/** Returns true if the blocks were persisted. */
const attemptPersistBlocks = (store: TetrisStore, blocks: Block[]): boolean => {
  const state = store.getState()
  if (state.gamestate === 'gameover') {
    return false
  }

  if (blocks.some((e) => state.blocks.some((f) => e.x === f.x && e.y === f.y))) {
    // One or more blocks overlap with existing blocks, the game is over.
    store.setState({ gamestate: 'gameover' })
    return false
  }

  // Persist the blocks, reset various things and go to the next shape.
  store.setState({
    blocks: blocks.reduce(withPersistedBlock, state.blocks),
    position: { ...DEFAULT_POSITION },
    direction: DEFAULT_DIRECTION,
    shapeQueue: advanceShapeQueue(state.shapeQueue),
  })
  clearFilledRows(store)

  const newState = store.getState()
  const newCurrentShape = selectCurrentShape(newState)
  const newShapeBlocks = calculateCoordinates(newCurrentShape.shape, {
    direction: newState.direction,
    x: newState.position.x,
    y: newState.position.y,
  })
  if (!arePositionsFree(newShapeBlocks, newState.blocks)) {
    const newBlockColor = colorFromShape(newCurrentShape.shape)
    store.setState({
      blocks: newShapeBlocks.reduce<Block[]>(
        (acc, block) => withUpsertedBlock(acc, { ...block, color: newBlockColor }),
        newState.blocks
      ),
      gamestate: 'gameover',
    })
  }

  return true
}

/** Attempts the move, if there's space. */
export const attemptToDoMove = (store: TetrisStore, operation: MoveOperation) => {
  const state = store.getState()
  if (state.gamestate !== 'alive') {
    return
  }

  const currentShape = selectCurrentShape(state)
  const { blocks, position, direction } = state

  // Determine the position after the move (calculateCoordinates).
  const newPositions: Coordinates = (() => {
    switch (operation) {
      case 'LEFT': {
        return calculateCoordinates(currentShape.shape, {
          direction,
          x: position.x - 1,
          y: position.y,
        })
      }
      case 'RIGHT': {
        return calculateCoordinates(currentShape.shape, {
          direction,
          x: position.x + 1,
          y: position.y,
        })
      }
      case 'DOWN': {
        return calculateCoordinates(currentShape.shape, {
          direction,
          x: position.x,
          y: position.y + 1,
        })
      }
      case 'ROTATE': {
        return calculateCoordinates(currentShape.shape, {
          direction: nextDirection(direction),
          x: position.x,
          y: position.y,
        })
      }
      default: {
        return assertNever(operation satisfies never)
      }
    }
  })()

  if (!arePositionsFree(newPositions, blocks)) {
    return
  }

  switch (operation) {
    case 'LEFT': {
      store.setState({ position: { x: position.x - 1, y: position.y } })
      break
    }
    case 'RIGHT': {
      store.setState({ position: { x: position.x + 1, y: position.y } })
      break
    }
    case 'DOWN': {
      doTick(store)
      break
    }
    case 'ROTATE': {
      store.setState({ direction: nextDirection(direction) })
      break
    }
    default: {
      assertNever(operation satisfies never)
    }
  }
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
  })

  // Move down if space is free.
  if (arePositionsFree(newPositions, blocks)) {
    store.setState({ position: { x: position.x, y: position.y + 1 } })
    return 'moved-down'
  }

  // Otherwise, persist and go to the next shape.
  const blockColor = colorFromShape(currentShape.shape)
  attemptPersistBlocks(
    store,
    calculateCoordinates(currentShape.shape, {
      direction,
      x: position.x,
      y: position.y,
    }).map((block) => ({ ...block, color: blockColor }))
  )
  return 'persisted-and-new-shape'
}

const arePositionsFree = (positions: Coordinates, blocks: readonly Block[]): boolean =>
  positions.every(
    (e) => e.x >= 0 && e.x < 10 && e.y < 20 && !blocks.some((f) => f.x === e.x && f.y === e.y)
  )

export const runTicks = async (store: TetrisStore, isCancelled: () => boolean) => {
  const positionY = (state: TetrisState) => state.position.y

  let lastTick = Date.now()
  let lastY = positionY(store.getState())
  while (await rafPromise()) {
    const now = Date.now()
    const state = store.getState()

    if (isCancelled()) {
      break
    }

    // If we moved down, reset the last tick.
    if (lastY !== positionY(state)) {
      lastY = positionY(state)
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
