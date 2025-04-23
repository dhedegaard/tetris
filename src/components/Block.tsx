import clsx from 'clsx'
import { memo, SVGProps, useMemo } from 'react'
import styles from './Block.module.css'

export interface BlockProps extends SVGProps<SVGRectElement> {
  renderType: 'ghost' | 'normal'
  x: number
  y: number
}

export const Block = memo<BlockProps>(function Block({ x, y, ...props }) {
  return (
    <rect
      {...useMemo(() => ({ ...props, renderType: undefined }), [props])}
      x={x}
      y={y}
      width={1}
      height={1}
      className={clsx(styles['block'] as string, 'stroke-black stroke-[0.025] text-inherit')}
    />
  )
})
