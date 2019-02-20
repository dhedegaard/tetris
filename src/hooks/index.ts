import { useRef } from 'react'
import { Coordinates } from '../components/ShapeDrawer'
import useBlocks from './useBlocks'
import useDirection from './useDirection'
import useKeyboard from './useKeyboard'
import usePosition from './usePosition'
import useShape from './useShape'
import useTick from './useTick'

/** A hook that contains all the logic regarding tetris. */
const useTetris = () => {
  const {
    position,
    moveLeft,
    moveRight,
    moveDown,
    resetPosition
  } = usePosition()
  const { shape, nextShape } = useShape()
  const { blocks, addBlocks, isBlockFree } = useBlocks()
  const {
    direction,
    resetDirection,
    setNextDirection,
    getNextDirection
  } = useDirection()
  const stateRef = useRef({
    position,
    direction,
    shape
  })
  stateRef.current = { position, direction, shape }

  /** Check that all the positions are free in the grid. */
  const isFreePositions = (newPositions: Coordinates): boolean =>
    newPositions.find(e => !isBlockFree(e)) == null

  /* Call this when we're ready to persist blocks. */
  const persistBlock = (blocksToPersist: Coordinates) => {
    addBlocks(blocksToPersist)
    nextShape()
    resetPosition()
    resetDirection()
    setTemporaryTick(undefined) // Disable any fast temp ticks.
    setTick(oldInterval => Math.floor(oldInterval * 0.95))
  }

  // Handle ticks
  const { setTick, setTemporaryTick } = useTick(
    shape,
    direction,
    position,
    isFreePositions,
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
    isFreePositions,
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
