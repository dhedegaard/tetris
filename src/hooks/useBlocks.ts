import { useState } from 'react'
import { Coordinate, Coordinates } from '../components/ShapeDrawer'

export default (setGameover: () => void) => {
  const [blocks, setBlocks] = useState<Coordinates>([])

  /** Checks to see if the given coordinate is free of blocks, and inside the grid. */
  const isBlockFree = (coordinate: Coordinate): boolean =>
    coordinate.y < 20 &&
    coordinate.x >= 0 &&
    coordinate.x < 10 &&
    blocks.find(b => b.x === coordinate.x && b.y === coordinate.y) == null

  const isRowFilled = (y: number, blocks: Coordinates): boolean =>
    blocks.filter(b => b.y === y).length === 10

  /** Clears filled rows from the blocks, moving all the blocks above down as well. */
  const clearFilledRows = () => {
    // The number of rows to move the blocks down by.
    setBlocks(oldBlocks => {
      let result: typeof oldBlocks = []
      let dy = 0
      for (let y = 19; y >= 0; y--) {
        if (isRowFilled(y, oldBlocks)) {
          dy++
        } else {
          result = [
            ...result,
            ...oldBlocks
              .filter(b => b.y === y)
              .map(b => ({
                ...b,
                y: y + dy
              }))
          ]
        }
      }
      return result
    })
  }

  const addBlocks = (newBlocks: Coordinates) => {
    setBlocks(oldBlocks => {
      for (const newBlock of newBlocks) {
        if (isBlockFree(newBlock)) {
          oldBlocks.push(newBlock)
        } else {
          // If we're trying to persist a block, that's not free, the game is over.
          setGameover()
        }
      }
      return oldBlocks
    })
  }

  /** Check that all the given positions are free in the grid. */
  const isFreePositions = (newPositions: Coordinates): boolean =>
    newPositions.find(e => !isBlockFree(e)) == null

  return {
    blocks,
    isBlockFree,
    addBlocks,
    clearFilledRows,
    isFreePositions,
    clearAllBlocks: () => setBlocks([])
  }
}
