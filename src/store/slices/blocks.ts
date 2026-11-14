export interface Coordinate {
  x: number
  y: number
}

export interface Block extends Coordinate {
  color: string
}

export const withPersistedBlock = (blocks: readonly Block[], block: Block): Block[] => {
  if (blocks.some((e) => e.x === block.x && e.y === block.y)) {
    throw new Error(`Block already exists: ${JSON.stringify(block)}`)
  }
  return [...blocks, block]
}

export const withUpsertedBlock = (blocks: readonly Block[], block: Block): Block[] => [
  ...blocks.filter((e) => e.x !== block.x || e.y !== block.y),
  block,
]

/** Removes row `y` and shifts every row above it one down. */
export const withoutRow = (blocks: readonly Block[], y: number): Block[] =>
  blocks.filter((e) => e.y !== y).map((e) => (e.y >= y ? e : { ...e, y: e.y + 1 }))
