import { useState } from 'react'
import { Coordinate, Coordinates } from '../components/ShapeDrawer'

export default () => {
  const [blocks, setBlocks] = useState<Coordinates>([])

  const isBlockFree = (coordinate: Coordinate): boolean =>
    blocks.find(b => b.x === coordinate.x && b.y === coordinate.y) == null

  const addBlocks = (newBlocks: Coordinates) => {
    setBlocks(oldBlocks => {
      for (const newBlock of newBlocks) {
        if (isBlockFree(newBlock)) {
          oldBlocks.push(newBlock)
        }
      }
      return oldBlocks
    })
  }

  return {
    blocks,
    isBlockFree,
    addBlocks
  }
}
