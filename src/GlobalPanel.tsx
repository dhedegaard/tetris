import React from 'react'
import styled, { css } from 'styled-components'
import { GameMode } from './App'

const Panel = styled.div<{ noBorderLeft: boolean }>`
  background: #000;
  height: ${400 - 8 * 2}px;
  border: 4px solid purple;
  border-right-width: 0;
  ${p =>
    p.noBorderLeft &&
    css`
      border-left-width: 0;
    `}
  padding: 8px;
  min-width: 150px;
  font-size: 12px;
`

const Container = styled.div`
  border: 1px double #fff;
  border-radius: 5px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`

const Title = styled.div`
  color: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: 5px;
  text-transform: uppercase;
  padding-bottom: 5px;
`

const Text = styled.div`
  padding-top: 4px;
  color: #fff;
  text-transform: uppercase;
  text-align: right;
  cursor: pointer;
`

const Toggle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 8px;
`

interface Props {
  musicEnabled: boolean
  toggleMusic: (enabled: boolean) => void
  gameMode: GameMode
  setGameMode: (gameMode: GameMode) => void
}

const GlobalPanel: React.FunctionComponent<Props> = props => (
  <Panel noBorderLeft={props.gameMode === 'local-coop'}>
    <Container>
      <Title>Music:</Title>
      <Toggle>
        <Text onClick={() => props.toggleMusic(true)}>
          {props.musicEnabled ? <>&gt; </> : <>&nbsp; </>}
          On
        </Text>{' '}
        <Text onClick={() => props.toggleMusic(false)}>
          {!props.musicEnabled ? <>&gt; </> : <>&nbsp; </>}
          Off
        </Text>
      </Toggle>
    </Container>
    <Container>
      <Title>Player mode:</Title>
      <Text onClick={() => props.setGameMode('single')}>
        {props.gameMode === 'single' ? <>&gt; </> : null}
        Single
      </Text>
      <Text onClick={() => props.setGameMode('local-coop')}>
        {props.gameMode === 'local-coop' ? <>&gt; </> : null}
        Local coop
      </Text>
    </Container>
  </Panel>
)

export default GlobalPanel
