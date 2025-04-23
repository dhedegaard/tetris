import clsx from 'clsx'
import { SVGProps } from 'react'
import styles from './Block.module.css'
import { omit } from 'lodash-es'

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
