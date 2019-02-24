import { useState } from 'react'
import { Direction, nextDirection } from '../components/shapes'

const DEFAULT_DIRECTION = Direction.RIGHT

export default () => {
  const [direction, setDirection] = useState(DEFAULT_DIRECTION)

  const resetDirection = () => setDirection(DEFAULT_DIRECTION)
  const setNextDirection = () =>
    setDirection(oldDirection => nextDirection(oldDirection))

  return {
    direction,
    resetDirection,
    setNextDirection
  }
}
