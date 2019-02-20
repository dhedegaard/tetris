import { useState } from 'react'
import { StateRef } from '.'
import { Coordinates } from '../components/ShapeDrawer'
import { calculateCoordinates } from '../components/shapes'
import useInterval from './useInterval'

export default (
  stateRef: StateRef,
  moveDown: () => void,
  persistBlock: (position: Coordinates) => void
) => {
  const [temporaryTick, setTemporaryTick] = useState<number | undefined>(
    undefined
  )
  const [tick, setTick] = useState(1000)

  useInterval(
    () => {
      const { shape, direction, position, isFreePositions } = stateRef.current
      const newPositions = calculateCoordinates(shape, {
        direction,
        x: position.x,
        y: position.y + 1
      })

      // If the next position is free, move down to it.
      if (isFreePositions(newPositions)) {
        moveDown()
        return
      }

      // Otherwise, persist the blocks and start a new shape.
      const oldPositions = calculateCoordinates(shape, {
        direction,
        x: position.x,
        y: position.y
      })
      persistBlock(oldPositions)
    },
    temporaryTick != null ? temporaryTick : tick
  )

  return {
    tick,
    setTick,
    setTemporaryTick
  }
}
