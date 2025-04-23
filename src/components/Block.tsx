import clsx from 'clsx'
import { omit } from 'lodash-es'
import { SVGProps } from 'react'
import styles from './Block.module.css'

export interface BlockProps extends SVGProps<SVGRectElement> {
  renderType: 'ghost' | 'normal'
  x: number
  y: number
}

export const Block = ({ x, y, ...props }: BlockProps) => (
  <rect
    {...omit(props, 'renderType')}
    x={x}
    y={y}
    width={1}
    height={1}
    className={clsx(styles['block'] as string, 'stroke-black stroke-[0.025] text-inherit')}
  />
)
