import type { TetrisState } from '../tetris'

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
    [29, 0.02],
  ])
)

/** Takes a given level, and converts it to a tick rate, in seconds. */
const calculateTickRate = (level: number): number => {
  // If we're able to map the level directly, do so.
  const tickrate1 = LEVEL_TO_TICK_RATE.get(level)
  if (tickrate1 != null) {
    return tickrate1
  }
  // Otherwise, find the lowest tickrate, at or below the level.
  return Array.from(LEVEL_TO_TICK_RATE.entries())
    .filter(([key]) => key <= level)
    .reduce((tickrate, [, rate]) => Math.min(rate, tickrate), Number.MAX_VALUE)
}

/** Each level progresses when 10 rows have been cleared. */
const calculateLevel = (rowsCleared: number) => Math.floor(rowsCleared / 10)

export const selectLevel = (state: TetrisState) => calculateLevel(state.rowsCleared)

/** Milliseconds between ticks at the current level. */
export const selectTickrate = (state: TetrisState) => calculateTickRate(selectLevel(state)) * 1_000
