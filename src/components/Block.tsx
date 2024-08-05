import { memo, SVGProps } from 'react'
import styles from './Block.module.css'

interface Props extends SVGProps<SVGRectElement> {
  x: number
  y: number
}

export const Block = memo<Props>(function Block(props: Props) {
  return (
    <rect
      {...props}
      width={1}
      height={1}
      className={`stroke-black stroke-[0.02] text-inherit ${styles['block'] as string}`}
    />
  )
})
