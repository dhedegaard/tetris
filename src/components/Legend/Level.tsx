import { memo, useMemo } from 'react'
import styles from './Level.module.css'

interface Props {
  level: number
}
export const Level = memo<Props>(function Level({ level }) {
  return (
    <div className={styles['container']}>
      <div className={styles['title']}>Level:</div>
      <div className={styles['text']}>
        {useMemo(() => Math.min(level, 99).toString().padStart(2, '0'), [level])}
      </div>
    </div>
  )
})
