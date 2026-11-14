import { useMemo } from 'react'
import { BOARD_HEIGHT } from '../store/slices/blocks'
import { useBlocks } from './useBlocks'
import { useShape } from './useShape'

export const useBottomShape = () => {
  const { concretePositions } = useShape()
  const { blocks } = useBlocks()

  const bottomYOffset = useMemo<number>(
    () =>
      Math.min(
        ...concretePositions.map<number>(({ x, y }) => {
          let minYPosition = BOARD_HEIGHT
          for (const block of blocks.filter((block) => block.x === x)) {
            if (block.y >= y && block.y < minYPosition) {
              minYPosition = block.y
            }
          }
          return Math.max(minYPosition - y - 1, 0)
        })
      ),
    [concretePositions, blocks]
  )

  return useMemo(() => ({ bottomYOffset }), [bottomYOffset])
}
