import { useMemo } from 'react'
import { Coordinate } from '../store/slices/blocks'
import { useShape } from './useShape'

export const useShapeBounds = () => {
  const { concretePositions } = useShape()

  return useMemo(() => {
    let leftBottomElement: Coordinate | undefined
    let rightBottomElement: Coordinate | undefined

    for (const position of concretePositions) {
      if (isFurtherLeftBottom(position, leftBottomElement)) {
        leftBottomElement = position
      }
      if (isFurtherRightBottom(position, rightBottomElement)) {
        rightBottomElement = position
      }
    }

    return {
      leftBottomElement,
      rightBottomElement,
    }
  }, [concretePositions])
}

const isFurtherLeftBottom = (candidate: Coordinate, current: Coordinate | undefined): boolean =>
  current == null || candidate.x < current.x || (candidate.x === current.x && candidate.y > current.y)

const isFurtherRightBottom = (candidate: Coordinate, current: Coordinate | undefined): boolean =>
  current == null || candidate.x > current.x || (candidate.x === current.x && candidate.y > current.y)
