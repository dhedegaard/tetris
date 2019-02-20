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
  const positionRef = useRef(position)

  /** Check that all the positions are free in the grid. */
  const isFreePositions = (newPositions: Coordinates): boolean =>
    newPositions.find(e => !isBlockFree(e)) == null

  // Handle keyboard events.
  useKeyboard(
    direction,
    shape,
    positionRef,
    isFreePositions,
    moveLeft,
    moveRight,
    setNextDirection,
    getNextDirection
  )

  // Handle ticks
  const { setTick } = useTick(
    shape,
    direction,
    position,
    isFreePositions,
    moveDown,
    oldPositions => {
      addBlocks(oldPositions)
      nextShape()
      resetPosition()
      resetDirection()
      setTick(oldInterval => Math.floor(oldInterval * 0.9))
    }
  )

  return {
    blocks,
    direction,
    position,
    shape
  }
}

export default useTetris
