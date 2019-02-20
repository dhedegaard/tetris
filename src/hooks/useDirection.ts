import { useState } from 'react'
import { Direction, nextDirection } from '../components/shapes'

export default () => {
  const [direction, setDirection] = useState(Direction.UP)

  const resetDirection = () => setDirection(Direction.UP)
  const setNextDirection = () =>
    setDirection(oldDirection => nextDirection(oldDirection))

  return {
    direction,
    resetDirection,
    setNextDirection,
    getNextDirection: () => nextDirection(direction)
  }
}
