import { useMemo } from 'react'
import { useBlocks } from './useBlocks'
import { useShape } from './useShape'

export const useBottomShape = () => {
  const { concretePositions } = useShape()
  const { blocks } = useBlocks()

  const bottomYOffset = useMemo<number>(
    () =>
      Math.min(
        ...concretePositions.map<number>(({ x, y }) => {
          // TODO: Terrible perf probably, fix later.
          const minYPosition = Math.min(
            ...blocks.filter((block) => block.x === x && block.y >= y).map((block) => block.y),
            20
          )
          return Math.max(minYPosition - y - 1, 0)
        })
      ),
    [concretePositions, blocks]
  )

  return useMemo(() => ({ bottomYOffset }), [bottomYOffset])
}
