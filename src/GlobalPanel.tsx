import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
  background: #000;
  height: ${400 - 8 * 2}px;
  border: 4px solid purple;
  border-right-width: 0;
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

interface Props {
  musicEnabled: boolean
  toggleMusic: (enabled: boolean) => void
}

const GlobalPanel: React.FunctionComponent<Props> = props => {
  return (
    <Panel>
      <Container>
        <Title>Music:</Title>
        <Text onClick={() => props.toggleMusic(!props.musicEnabled)}>
          {props.musicEnabled ? 'disable' : 'enable'}
        </Text>
      </Container>
    </Panel>
  )
}

export default GlobalPanel
