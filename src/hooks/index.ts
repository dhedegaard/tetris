import { useEffect } from 'react'
import { Coordinates } from '../components/ShapeDrawer'
import { calculateCoordinates } from '../components/shapes'
import useBlocks from './useBlocks'
import useDirection from './useDirection'
import useInterval from './useInterval'
import usePosition from './usePosition'
import useShape from './useShape'

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
  const { direction, resetDirection, setNextDirection } = useDirection()

  const isFreePositions = (newPositions: Coordinates): boolean =>
    newPositions.find(e => !isBlockFree(e)) != null

  useEffect(() => {
    const keypressHandler = (evt: KeyboardEvent) => {
      switch (evt.keyCode) {
        case 37: // left
          moveLeft()
          break
        case 39: // right
          moveRight()
          break
        case 38: // up
          setNextDirection()
          break
        default:
          console.log('Unknown keycode:', evt.keyCode)
      }
    }

    document.addEventListener('keydown', keypressHandler)
    return () => document.removeEventListener('keydown', keypressHandler)
  }, [])

  useInterval(() => {
    const newY = Math.min(position.y + 1, 20)

    const newPositions = calculateCoordinates(shape, {
      direction,
      x: position.x,
      y: newY
    })

    if (isFreePositions(newPositions)) {
      const oldPositions = calculateCoordinates(shape, {
        direction,
        x: position.x,
        y: position.y
      })
      addBlocks(oldPositions)
      nextShape()
      resetPosition()
      resetDirection()
      return {
        x: 5,
        y: 1
      }
    }

    moveDown()
  }, 1000)

  return {
    blocks,
    direction,
    position,
    shape
  }
}

export default useTetris
