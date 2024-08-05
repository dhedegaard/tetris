import { createSelector } from '@reduxjs/toolkit'
import { Coordinates } from '../../components/ShapeDrawer'
import { calculateCoordinates, colorFromShape, nextDirection } from '../../components/shapes'
import { Block, blocksActions } from '../slices/blocks'
import { directionActions } from '../slices/direction'
import { gamestateActions } from '../slices/gamestate'
import { levelActions, selectLevel, selectTickrate } from '../slices/level'
import { positionActions } from '../slices/position'
import { runningActions } from '../slices/running'
import { scoreActions } from '../slices/score'
import { selectCurrentShape, shapeActions } from '../slices/shape'
import { TetrisStoreDispatch, TetrisStoreState } from '../tetris'

export const startNewGame =
  () => (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
    if (getState().gamestate.gamestate !== 'gameover') {
      return
    }

    dispatch(blocksActions.clearAllBlocks())
    dispatch(shapeActions.nextShape())
    dispatch(positionActions.resetPosition())
    dispatch(directionActions.resetDirection())
    dispatch(gamestateActions.setAlive())
    dispatch(scoreActions.resetScore())
    dispatch(levelActions.resetLevel())
  }

export const clearFilledRows =
  () => (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
    let rowsCleared = 0

    // The scoring later depends on the level before clearing rows, so we
    // calculate the level beforehand.
    const level = selectLevel(getState())

    for (;;) {
      const state = getState()
      const [filledRow] = selectFilledRows(state)
      if (filledRow == null) {
        break
      }

      // Clear the filled rows and increment.
      dispatch(blocksActions.clearRow(filledRow))
      rowsCleared++
    }

    // Increase the score based on the nubmer of rows cleared and the current
    // level.
    if (rowsCleared > 0) {
      dispatch(levelActions.incrementRowsCleared(rowsCleared))
      dispatch(scoreActions.increaseScore(calculateScore(level, rowsCleared)))
    }

    return rowsCleared
  }

const selectBlocks = (state: TetrisStoreState) => state.blocks.blocks
const selectFilledRows = createSelector(selectBlocks, (blocks) => {
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
      // move the blocks from the current
    }
  }
  return result
})

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

export const attemptPersistBlocks =
  (blocks: Block[]) =>
  (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState): boolean => {
    const state = getState()
    if (state.gamestate.gamestate === 'gameover') {
      return false
    }

    if (blocks.some((e) => state.blocks.blocks.some((f) => e.x === f.x && e.y === f.y))) {
      // One or more blocks overlap with existing blocks, the game is over.
      dispatch(gamestateActions.setGameover())
      return false
    }

    // Persist the blocks and return true.
    blocks.forEach((block) => dispatch(blocksActions.persistBlock(block)))

    // Reset various things and go to the next shape.
    dispatch(positionActions.resetPosition())
    dispatch(directionActions.resetDirection())
    dispatch(shapeActions.nextShape())
    dispatch(clearFilledRows())

    return true
  }

/** Attemps to move left, if there's space. */
export const attemptToDoMove =
  (operation: 'LEFT' | 'RIGHT' | 'DOWN' | 'ROTATE') =>
  (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
    const state = getState()
    const currentShape = selectCurrentShape(state)
    const {
      blocks: { blocks },
      position: { position },
      direction: { direction },
    } = state

    // Determine the position after the move (calculateCoordinates).
    const newPositions = (() => {
      switch (operation) {
        case 'LEFT':
          return calculateCoordinates(currentShape.shape, {
            direction,
            x: position.x - 1,
            y: position.y,
          })
        case 'RIGHT':
          return calculateCoordinates(currentShape.shape, {
            direction,
            x: position.x + 1,
            y: position.y,
          })
        case 'DOWN':
          return calculateCoordinates(currentShape.shape, {
            direction,
            x: position.x,
            y: position.y + 1,
          })
        case 'ROTATE':
          return calculateCoordinates(currentShape.shape, {
            direction: nextDirection(direction),
            x: position.x,
            y: position.y,
          })
        default:
          // @ts-expect-error - exhaustive check
          throw new TypeError(`Unknown operation: ${operation.toString()}`)
      }
    })()

    // Check if the spots are free in the new positions.
    if (arePositionsFree(newPositions, blocks)) {
      // Apply the operations.
      switch (operation) {
        case 'LEFT':
        case 'RIGHT':
          dispatch(
            positionActions.movePosition({
              dx: operation === 'LEFT' ? -1 : operation === 'RIGHT' ? +1 : 0,
              dy: 0,
            })
          )
          break
        case 'DOWN':
          dispatch(doTick())
          break
        case 'ROTATE':
          dispatch(directionActions.rotateDirection())
          break
        default:
          // @ts-expect-error - exhaustive check
          throw new TypeError(`Unknown operation: ${operation.toString()}`)
      }
    }
  }

export const moveGoToBottom = () => (dispatch: TetrisStoreDispatch) => {
  while (dispatch(doTick()) === 'moved-down') {}
}

export const doTick =
  () =>
  (
    dispatch: TetrisStoreDispatch,
    getState: () => TetrisStoreState
  ): 'moved-down' | 'persisted-and-new-shape' | 'not-alive' => {
    const state = getState()
    if (state.gamestate.gamestate !== 'alive') {
      return 'not-alive'
    }

    const {
      direction: { direction },
      position: { position },
      blocks: { blocks },
    } = state
    const currentShape = selectCurrentShape(state)

    // Calculate the new position of the currently active shape.
    const newPositions = calculateCoordinates(currentShape.shape, {
      direction,
      x: position.x,
      y: position.y + 1,
    })

    // Move down if space is free.
    if (arePositionsFree(newPositions, blocks)) {
      dispatch(positionActions.movePosition({ dx: 0, dy: +1 }))
      return 'moved-down'
    }

    // Otherwise, persist and go to the next shape.
    const blockColor = colorFromShape(currentShape.shape)
    dispatch(
      attemptPersistBlocks(
        calculateCoordinates(currentShape.shape, {
          direction,
          x: position.x,
          y: position.y,
        }).map((block) => ({ ...block, color: blockColor }))
      )
    )
    return 'persisted-and-new-shape'
  }

const arePositionsFree = (positions: Coordinates, blocks: Block[]): boolean =>
  positions.every(
    (e) => e.x >= 0 && e.x < 10 && e.y < 20 && !blocks.some((f) => f.x === e.x && f.y === e.y)
  )

export const runTicks =
  () => async (dispatch: TetrisStoreDispatch, getState: () => TetrisStoreState) => {
    const {
      position: {
        position: { y: oldY },
      },
      running: { running },
    } = getState()
    if (running) {
      // If there's already a RAF loop, stop here and let it do the work.
      // eslint-disable-next-line no-console
      console.warn('Trying to runTicks(), but were already running.')
      return
    }
    dispatch(runningActions.setRunning())

    let lastTick = Date.now()
    let lastY = oldY
    while (await rafPromise()) {
      const now = Date.now()
      const state = getState()

      if (!state.running.running) {
        break
      }

      // If we moved down, reset the last tick.
      if (lastY !== state.position.position.y) {
        lastY = state.position.position.y
        lastTick = Date.now()
        continue
      }

      const tickrate = selectTickrate(state)
      const delta = now - lastTick
      if (delta >= tickrate) {
        lastTick += Math.floor(delta / tickrate) * tickrate
        dispatch(doTick())
      }
    }
    dispatch(runningActions.setStopped())
  }

const rafPromise = (): Promise<boolean> =>
  new Promise<boolean>((resolve) => {
    requestAnimationFrame(() => {
      resolve(true)
    })
  })
