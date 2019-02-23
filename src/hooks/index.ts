import { useRef } from 'react'
import { Coordinate, Coordinates } from '../components/ShapeDrawer'
import { Direction, Shapes } from '../components/shapes'
import useBlocks from './useBlocks'
import useDirection from './useDirection'
import useGamestate, { Gamestate } from './useGamestate'
import useKeyboard from './useKeyboard'
import usePosition from './usePosition'
import useShape from './useShape'
import useTick from './useTick'

export type StateRef = React.MutableRefObject<{
  position: Coordinate
  direction: Direction
  shape: Shapes
  gamestate: Gamestate
  isFreePositions: (newPositions: Coordinates) => boolean
}>

/** A hook that contains all the logic regarding tetris. */
const useTetris = () => {
  const { gamestate, setGameover } = useGamestate()
  const {
    position,
    moveLeft,
    moveRight,
    moveDown,
    resetPosition
  } = usePosition()
  const { shape, nextShape } = useShape()
  const { blocks, addBlocks, clearFilledRows, isFreePositions } = useBlocks(
    setGameover
  )
  const {
    direction,
    resetDirection,
    setNextDirection,
    getNextDirection
  } = useDirection()

  // Build a ref os state, for various cases.
  const stateRef: StateRef = useRef({
    position,
    direction,
    shape,
    isFreePositions,
    gamestate
  })
  stateRef.current = {
    position,
    direction,
    shape,
    isFreePositions,
    gamestate
  }

  /* Call this when we're ready to persist blocks. */
  const persistBlock = (blocksToPersist: Coordinates) => {
    addBlocks(blocksToPersist)
    clearFilledRows()
    nextShape()
    resetPosition()
    resetDirection()
    setTemporaryTick(undefined) // Disable any fast temp ticks.
    setTick(oldInterval => Math.max(Math.floor(oldInterval * 0.95), 60))
  }

  // Handle ticks
  const { setTick, setTemporaryTick } = useTick(
    stateRef,
    moveDown,
    persistBlock
  )

  /* While the next position is free, move down fast. */
  const setMoveToBottom = (moveToBottom: boolean) => {
    setTemporaryTick(moveToBottom ? 40 : undefined)
  }

  // Handle keyboard events.
  useKeyboard(
    stateRef,
    moveLeft,
    moveRight,
    setNextDirection,
    getNextDirection,
    setMoveToBottom
  )

  return {
    blocks,
    direction,
    position,
    shape
  }
}

export default useTetris
