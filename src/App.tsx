import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Block from './components/Block'
import Grid from './components/Grid'
import { Shape } from './components/shapes'
import GameOver from './GameOver'
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

const GridContainer = styled.div`
  margin-top: 10px;
  border: 4px solid purple;
`

const App: React.FunctionComponent = () => {
  const { direction, shape, position, blocks, gamestate } = useTetris()

  return (
    <>
      <GlobalStyle />
      <Container>
        <GridContainer>
          <Grid>
            {gamestate !== 'gameover' && (
              <Shape
                direction={direction}
                shape={shape}
                x={position.x}
                y={position.y}
              />
            )}
            {blocks.map(({ x, y }) => (
              <Block x={x} y={y} key={`block_${x}_${y}`} />
            ))}
            {gamestate === 'gameover' && <GameOver />}
          </Grid>
        </GridContainer>
      </Container>
    </>
  )
}

export default App
