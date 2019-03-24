import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Music from './components/Music'
import FontLoader from './FontLoader'
import Game from './Game'
import GlobalPanel from './GlobalPanel'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: stretch;
`

export type GameMode = 'single' | 'local-coop'

const App: React.FunctionComponent = () => {
  const [gameMode, setGameMode] = useState<GameMode>('single')
  const [musicEnabled, setMusicEnabled] = useState(false)

  return (
    <>
      <GlobalStyle />
      <FontLoader />
      {musicEnabled && <Music />}
      <Container key={gameMode}>
        {gameMode === 'local-coop' && <Game player="keyboard2" />}
        <GlobalPanel
          musicEnabled={musicEnabled}
          toggleMusic={enabled => setMusicEnabled(enabled)}
          gameMode={gameMode}
          setGameMode={gameMode => setGameMode(gameMode)}
        />
        <Game player="keyboard1" />
      </Container>
    </>
  )
}

export default App
