import { memo, useCallback } from 'react'
import styles from './GlobalPanel.module.css'

interface Props {
  musicEnabled: boolean
  toggleMusic: (enabled: boolean) => void
}

export const GlobalPanel = memo<Props>(function GlobalPanel({ toggleMusic, musicEnabled }) {
  return (
    <div className={styles['panel']}>
      <h1 className={styles['h1']}>Tetris</h1>
      <div className={styles['container']}>
        <div className={styles['title']}>Music:</div>
        <div className={styles['toggle']}>
          <div
            className={styles['text']}
            onClick={useCallback(() => {
              toggleMusic(true)
            }, [toggleMusic])}
          >
            {musicEnabled ? <>&gt; </> : <>&nbsp; </>}
            On
          </div>{' '}
          <div
            className={styles['text']}
            onClick={useCallback(() => {
              toggleMusic(false)
            }, [toggleMusic])}
          >
            {!musicEnabled ? <>&gt; </> : <>&nbsp; </>}
            Off
          </div>
        </div>
      </div>
    </div>
  )
})
