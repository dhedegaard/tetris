import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Block from './components/Block'
import Grid from './components/Grid'
import { Shape } from './components/shapes'
import useTetris from './hooks'

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
  const { direction, shape, position, blocks } = useTetris()

  return (
    <>
      <GlobalStyle />
      <Container>
        <Grid>
          <Shape
            direction={direction}
            shape={shape}
            x={position.x}
            y={position.y}
          />
          {blocks.map(({ x, y }) => (
            <Block x={x} y={y} key={`block_${x}_${y}`} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default App
