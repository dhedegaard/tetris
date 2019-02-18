import React, { Component } from 'react'
import Grid from './components/Grid'
import { Direction } from './components/shapes'
import I from './components/shapes/I'
import J from './components/shapes/J'
import L from './components/shapes/L'
import O from './components/shapes/O'
import S from './components/shapes/S'
import T from './components/shapes/T'
import Z from './components/shapes/Z'

class App extends Component {
  render() {
    return (
      <Grid>
        <I x={1} y={2} direction={Direction.UP} />
        <I x={4} y={1} direction={Direction.LEFT} />
        <O x={3} y={3} direction={Direction.UP} />
        <T x={7} y={4} direction={Direction.UP} />
        <T x={16} y={2} direction={Direction.RIGHT} />
        <T x={2} y={6} direction={Direction.DOWN} />
        <T x={6} y={6} direction={Direction.LEFT} />
        <S x={7} y={2} direction={Direction.UP} />
        <S x={2} y={16} direction={Direction.LEFT} />
        <Z x={3} y={17} direction={Direction.UP} />
        <Z x={7} y={17} direction={Direction.LEFT} />
        <J x={2} y={14} direction={Direction.UP} />
        <J x={5} y={14} direction={Direction.DOWN} />
        <J x={8} y={13} direction={Direction.LEFT} />
        <J x={23} y={7} direction={Direction.RIGHT} />
        <L x={2} y={10} direction={Direction.UP} />
        <L x={5} y={10} direction={Direction.DOWN} />
        <L x={8} y={10} direction={Direction.LEFT} />
        <L x={12} y={10} direction={Direction.RIGHT} />
      </Grid>
    )
  }
}

export default App
