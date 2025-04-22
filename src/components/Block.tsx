import { memo, SVGProps } from 'react'
import styles from './Block.module.css'

export interface BlockProps extends SVGProps<SVGRectElement> {
  renderType: 'ghost' | 'normal'
  x: number
  y: number
}

export const Block = memo<BlockProps>(function Block(props: BlockProps) {
  return (
    <rect
      {...props}
      width={1}
      height={1}
      // TODO: Change the stroke type for ghost rendering.
      className={`stroke-black stroke-[0.02] text-inherit ${styles['block'] as string}`}
    />
  )
})
