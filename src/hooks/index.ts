import { useEffect, useRef, useState } from 'react'
import { Coordinates } from '../components/ShapeDrawer'
import {
  calculateCoordinates,
  Direction,
  getRandomShape,
  nextDirection,
  Shapes
} from '../components/shapes'
import useInterval from './useInterval'

const useTetris = () => {
  const [position, setPosition] = useState({ x: 5, y: 1 })
  const [shape, setShape] = useState<Shapes>(getRandomShape())
  const [direction, setDirection] = useState(Direction.UP)
  const [blocks, setBlocks] = useState<Coordinates>([])

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
          setDirection(oldDirection => nextDirection(oldDirection))
          break
        default:
          console.log('Unknown keycode:', evt.keyCode)
      }
    }

    document.addEventListener('keydown', keypressHandler)
    return () => document.removeEventListener('keydown', keypressHandler)
  }, [])

  const intervalHandle = useRef<NodeJS.Timer | undefined>(undefined)
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
        setShape(getRandomShape())
        setDirection(Direction.UP)
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
