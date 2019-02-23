import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Block from './components/Block'
import Grid from './components/Grid'
import { Shape } from './components/shapes'
import FontLoader from './FontLoader'
import GameOver from './GameOver'
import useTetris from './hooks'
import Score from './Score'

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

const LegendContainer = styled.div`
  background-color: #000;
  border: 3px solid purple;
  border-left: none;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-self: normal;
  margin-top: 10px;
`

const App: React.FunctionComponent = () => {
  const { direction, shape, position, blocks, gamestate, score } = useTetris()

  return (
    <>
      <GlobalStyle />
      <FontLoader />
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
        <LegendContainer>
          <Score score={score} />
        </LegendContainer>
      </Container>
    </>
  )
}

export default App
