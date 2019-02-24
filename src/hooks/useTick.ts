import { useState } from 'react'
import { StateRef } from '.'
import { Coordinates } from '../components/ShapeDrawer'
import { calculateCoordinates } from '../components/shapes'
import useInterval from './useInterval'

const INITIAL_TICKS = 800

export default (
  stateRef: StateRef,
  moveDown: () => void,
  persistBlock: (position: Coordinates) => void
) => {
  const [temporaryTick, setTemporaryTick] = useState<number | undefined>(
    undefined
  )
  const [tick, setTick] = useState(INITIAL_TICKS)

  useInterval(
    () => {
      const {
        shape,
        direction,
        position,
        isFreePositions,
        gamestate
      } = stateRef.current

      // If the game is over, don't do anything.
      if (gamestate === 'gameover') {
        return
      }

      // Calculate the new position of the currently active shape.
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
    stateRef.current.gamestate === 'gameover'
      ? 1000
      : temporaryTick != null
      ? temporaryTick
      : tick
  )

  const resetTick = () => {
    setTick(INITIAL_TICKS)
    setTemporaryTick(undefined)
  }

  return {
    tick,
    setTick,
    setTemporaryTick,
    resetTick
  }
}
