import clsx from 'clsx'
import { memo, SVGProps } from 'react'
import styles from './Block.module.css'

export interface BlockProps extends SVGProps<SVGRectElement> {
  renderType: 'ghost' | 'normal'
  x: number
  y: number
}

export const Block = memo<BlockProps>(function Block({ renderType, x, y, ...props }) {
  void renderType

  return (
    <rect
      {...props}
      x={x}
      y={y}
      width={1}
      height={1}
      className={clsx(styles['block'], 'stroke-black stroke-[0.025] text-inherit')}
    />
  )
})
