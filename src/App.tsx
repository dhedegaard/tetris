import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Music from './components/Music'
import FontLoader from './FontLoader'
import Game from './Game'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`

const App: React.FunctionComponent = () => {
  return (
    <>
      <GlobalStyle />
      <FontLoader />
      <Music />
      <Container>
        <Game />
      </Container>
    </>
  )
}

export default App
