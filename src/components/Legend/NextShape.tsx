import { memo } from 'react'
import { useIsBrowser } from '../../hooks/useIsBrowser'
import { ShapeElement, ShapeRenderer } from '../shapes'
import styles from './NextShape.module.css'

interface Props {
  nextShapes: readonly ShapeElement[]
}

export const NextShape = memo<Props>(function NextShape({ nextShapes }) {
  const isBrowser = useIsBrowser()
  if (!isBrowser) {
    return null
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>Next:</div>
      {nextShapes.map((shape) => (
        <svg viewBox="0 0 5 3" width="100%" key={shape.key} className="m-[10px] block">
          <ShapeRenderer direction="RIGHT" shape={shape} x={1} y={1} />
        </svg>
      ))}
    </div>
  )
})
