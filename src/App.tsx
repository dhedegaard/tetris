'use client'

import { useCallback, useState } from 'react'
import styles from './App.module.css'
import { GameWithStore } from './Game'
import { GlobalPanel } from './GlobalPanel'
import { Music } from './components/Music'
import { font } from './font'
import './styles/global.css'

export const App = () => {
  const [musicEnabled, setMusicEnabled] = useState(false)

  const toggleMusic = useCallback((enabled: boolean) => {
    setMusicEnabled(enabled)
  }, [])

  return (
    <>
      {musicEnabled && <Music />}
      <main
        className={`${font.variable} ${styles['main'] as string} mx-auto box-border flex aspect-[1.11] h-auto max-h-[calc(100vh-8px)] items-stretch justify-center gap-[4px] border-4 border-solid border-[purple] bg-[purple] max-sm:aspect-[0.82]`}
      >
        <GlobalPanel musicEnabled={musicEnabled} toggleMusic={toggleMusic} />
        <GameWithStore />
      </main>
    </>
  )
}
