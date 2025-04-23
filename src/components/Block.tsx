import clsx from 'clsx'
import { SVGProps } from 'react'
import styles from './Block.module.css'

export interface BlockProps extends SVGProps<SVGRectElement> {
  renderType: 'ghost' | 'normal'
  x: number
  y: number
}

export const Block = ({ renderType: _, ...props }: BlockProps) => (
  <rect
    {...props}
    width={1}
    height={1}
    className={clsx(styles['block'] as string, 'stroke-black stroke-[0.025] text-inherit')}
  />
)
