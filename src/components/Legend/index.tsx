import isEqual from 'lodash-es/isEqual'
import { memo } from 'react'
import { ShapeElement } from '../shapes'
import styles from './index.module.css'
import { Level } from './Level'
import { NextShape } from './NextShape'
import { Score } from './Score'

interface Props {
  score: number
  level: number
  peekShapes: readonly ShapeElement[]
}

export const Legend = memo<Props>(function Legend({ score, level, peekShapes }) {
  return (
    <div className={styles['legendContainer']}>
      <div className="flex flex-col items-stretch gap-[8px]">
        <Score score={score} />
        <Level level={level} />
      </div>
      <NextShape nextShapes={peekShapes} />
    </div>
  )
}, isEqual)
