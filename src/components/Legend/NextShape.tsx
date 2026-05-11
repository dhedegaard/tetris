import { memo } from 'react'
import { ShapeElement, ShapeRenderer } from '../shapes'
import styles from './NextShape.module.css'

interface Props {
  nextShapes: readonly ShapeElement[]
  isShapeQueueReady: boolean
}

const EMPTY_PREVIEW_SLOTS = Object.freeze([undefined, undefined] as const)

export const NextShape = memo<Props>(function NextShape({ nextShapes, isShapeQueueReady }) {
  const previewSlots: readonly (ShapeElement | undefined)[] = isShapeQueueReady
    ? nextShapes
    : EMPTY_PREVIEW_SLOTS

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>Next:</div>
      {previewSlots.map((shape, index) => (
        <svg
          viewBox="0 0 5 3"
          width="100%"
          key={shape?.key ?? `empty-preview-slot-${index.toString()}`}
          className="m-[10px] block"
        >
          {shape != null && (
            <ShapeRenderer direction="RIGHT" shape={shape} x={1} y={1} renderType="normal" />
          )}
        </svg>
      ))}
    </div>
  )
})
