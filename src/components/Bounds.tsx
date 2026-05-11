import { memo, useMemo } from 'react'
import { useBlocks } from '../hooks/useBlocks'
import { useShape } from '../hooks/useShape'
import { assertNever } from '../lib/assert-never'

interface Props {
  x: number
  y: number
  side: 'left' | 'right'
}

const WIDTH = 0.02

export const Bounds = memo<Props>(function Bounds({ x, y, side, ...props }) {
  const {
    shape: { color },
  } = useShape()

  // Go down until the next block with a higher y value is found, and stop
  // there. Or proceed to the max y value of the board.
  const { blocks } = useBlocks()
  const y2 = useMemo(
    () => blocks.filter((e) => e.x === x && e.y >= y).sort((a, b) => a.y - b.y)[0]?.y ?? 20,
    [blocks, x, y]
  )

  // Determine the absolute X values to render based on the side, the width and
  // the current X position.
  const renderedX = useMemo(() => {
    switch (side) {
      case 'left': {
        return x
      }
      case 'right': {
        return x + 1
      }
      default: {
        assertNever(side satisfies never)
      }
    }
  }, [side, x])

  return (
    <line
      {...props}
      className="opacity-30 transition-all duration-[40ms] ease-in-out"
      x1={renderedX}
      y1={y + 1}
      x2={renderedX}
      y2={y2}
      stroke={color}
      strokeWidth={WIDTH}
    />
  )
})
