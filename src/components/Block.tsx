import { memo, SVGProps } from 'react'
import styles from './Block.module.css'
import clsx from 'clsx'
import { match } from 'ts-pattern'

export interface BlockProps extends SVGProps<SVGRectElement> {
  renderType: 'ghost' | 'normal'
  x: number
  y: number
}

export const Block = memo<BlockProps>(function Block({ renderType, ...props }) {
  return (
    <rect
      {...props}
      width={1}
      height={1}
      className={clsx(
        styles['block'] as string,
        'stroke-[0.025] text-inherit',
        match(renderType)
          .with('ghost', () => 'opacity-40')
          .with('normal', () => 'stroke-black')
          .exhaustive()
      )}
    />
  )
})
