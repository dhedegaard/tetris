import { useEffect, useState } from 'react'
import { Coordinates } from '../components/ShapeDrawer'
import { calculateCoordinates, getRandomShape } from '../components/shapes'
import useDirection from './useDirection'
import useInterval from './useInterval'
import useShape from './useShape'

const useTetris = () => {
  const [position, setPosition] = useState({ x: 5, y: 1 })
  const { shape, nextShape } = useShape()
  const [blocks, setBlocks] = useState<Coordinates>([])
  const { direction, resetDirection, setNextDirection } = useDirection()

  useEffect(() => {
    const keypressHandler = (evt: KeyboardEvent) => {
      switch (evt.keyCode) {
        case 37: // left
          setPosition(oldPosition => ({
            ...oldPosition,
            x: Math.max(oldPosition.x - 1, 1)
          }))
          break
        case 39: // right
          setPosition(oldPosition => ({
            ...oldPosition,
            x: Math.min(oldPosition.x + 1, 20)
          }))
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
    setPosition(oldPosition => {
      const newY = Math.min(oldPosition.y + 1, 20)

      const newPositions = calculateCoordinates(shape, {
        direction,
        x: oldPosition.x,
        y: newY
      })

      if (
        newPositions.find(
          e => e.y >= 20 || blocks.find(b => b.x === e.x && b.y === e.y) != null
        ) != null
      ) {
        const oldPositions = calculateCoordinates(shape, {
          direction,
          x: oldPosition.x,
          y: oldPosition.y
        })
        nextShape()
        resetDirection()
        setBlocks([...blocks, ...oldPositions])
        return {
          x: 5,
          y: 1
        }
      }

      return {
        ...oldPosition,
        y: newY
      }
    })
  }, 1000)

  return {
    blocks,
    direction,
    position,
    shape
  }
}

export default useTetris
