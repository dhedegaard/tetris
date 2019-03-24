import React from 'react'
import styled from 'styled-components'
import Block from './components/Block'
import Grid from './components/Grid'
import Legend from './components/Legend'
import { Shape } from './components/shapes'
import GameOver from './GameOver'
import useTetris from './hooks'
import { Player } from './hooks/useKeyboard'

const GridContainer = styled.div`
  border: 4px solid purple;
`

interface Props {
  player: Player
}

const Game: React.FunctionComponent<Props> = ({ player }) => {
  const {
    direction,
    shape,
    position,
    blocks,
    gamestate,
    score,
    peekShapes,
    level
  } = useTetris({ player })

  return (
    <>
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
      <Legend score={score} peekShapes={peekShapes} level={level} />
    </>
  )
}

export default Game
