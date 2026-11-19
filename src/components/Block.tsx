import clsx from 'clsx'
import { memo, type SVGProps } from 'react'
import styles from './Block.module.css'

export interface BlockProps extends Pick<SVGProps<SVGRectElement>, 'fill'> {
  renderType: 'ghost' | 'normal'
  x: number
  y: number
}

export const Block = memo<BlockProps>(function Block({ fill, x, y }) {
  return (
    <rect
      fill={fill}
      x={x}
      y={y}
      width={1}
      height={1}
      className={clsx(styles['block'], 'stroke-black stroke-[0.025] text-inherit')}
    />
  )
})
