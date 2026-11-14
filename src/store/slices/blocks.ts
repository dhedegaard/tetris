export interface Coordinate {
  x: number
  y: number
}

export interface Block extends Coordinate {
  color: string
}

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20

export const sameCell = (a: Coordinate, b: Coordinate) => a.x === b.x && a.y === b.y

export const withUpsertedBlock = (blocks: readonly Block[], block: Block): Block[] => [
  ...blocks.filter((e) => !sameCell(e, block)),
  block,
]

/** Removes row `y` and shifts every row above it one down. */
export const withoutRow = (blocks: readonly Block[], y: number): Block[] =>
  blocks.filter((e) => e.y !== y).map((e) => (e.y >= y ? e : { ...e, y: e.y + 1 }))
