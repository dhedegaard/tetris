import { useState } from 'react'

/**
 * The various break points for the tick rate, based on what level you're on.
 * The tick rate is in seconds.
 */
const LEVEL_TO_TICK_RATE: Readonly<Map<number, number>> = Object.freeze(
  new Map([
    [0, 0.8],
    [1, 0.72],
    [2, 0.63],
    [3, 0.55],
    [4, 0.47],
    [5, 0.38],
    [6, 0.3],
    [7, 0.22],
    [8, 0.13],
    [9, 0.1],
    [10, 0.08],
    [13, 0.07],
    [16, 0.05],
    [19, 0.03],
    [29, 0.02]
  ])
)

/** Takes a given level, and converts it to a tick rate, in seconds. */
export const calculateTickRate = (level: number): number => {
  // If we're able to map the level directly, do so.
  let tickrate = LEVEL_TO_TICK_RATE.get(level)
  if (tickrate != null) {
    return tickrate
  }
  // Otherwise, find the closes match below the level.
  tickrate = Number.MAX_VALUE
  for (const [key, rate] of LEVEL_TO_TICK_RATE.entries()) {
    if (key <= level && rate < tickrate) {
      tickrate = rate
    }
  }
  return tickrate
}

/** Each level progresses when 10 rows have been cleared. */
const calculateLevel = (rowsCleared: number) => Math.floor(rowsCleared / 10)

/** The level of the game */
export default () => {
  const [rowsCleared, setRowsCleared] = useState(0)

  /** Call this to increase the number of rows cleared, and maybe the level. */
  const incrementRowsCleared = (amount: number) =>
    setRowsCleared(rowsCleared + amount)

  /** Call this to reset the level state. */
  const resetLevel = () => setRowsCleared(0)

  return {
    level: calculateLevel(rowsCleared),
    incrementRowsCleared,
    resetLevel
  }
}
