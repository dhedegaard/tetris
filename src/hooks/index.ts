import { useEffect } from 'react'
import { Coordinates } from '../components/ShapeDrawer'
import { calculateCoordinates } from '../components/shapes'
import useBlocks from './useBlocks'
import useDirection from './useDirection'
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

  /** Check that all the positions are free in the grid. */
  const isFreePositions = (newPositions: Coordinates): boolean =>
    newPositions.find(e => !isBlockFree(e)) == null

  useEffect(() => {
    const keypressHandler = (evt: KeyboardEvent) => {
      switch (evt.keyCode) {
        case 37: {
          // left
          const newPositions = calculateCoordinates(shape, {
            direction,
            x: position.x - 1,
            y: position.y
          })
          if (isFreePositions(newPositions)) {
            moveLeft()
          }
          break
        }
        case 39: {
          // right
          const newPositions = calculateCoordinates(shape, {
            direction,
            x: position.x + 1,
            y: position.y
          })
          if (isFreePositions(newPositions)) {
            moveRight()
          }
          break
        }
        case 38: {
          // up
          const newPositions = calculateCoordinates(shape, {
            direction: getNextDirection(),
            x: position.x,
            y: position.y
          })
          if (isFreePositions(newPositions)) {
            setNextDirection()
          }
          break
        }
        default:
          console.log('Unknown keycode:', evt.keyCode)
      }
    }

    document.addEventListener('keydown', keypressHandler)
    return () => document.removeEventListener('keydown', keypressHandler)
  }, [])

  useTick(
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
