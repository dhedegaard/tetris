import React, { Component } from 'react'
import { Direction } from './components/shapes'
import I from './components/shapes/I'
import J from './components/shapes/J'
import O from './components/shapes/O'
import S from './components/shapes/S'
import T from './components/shapes/T'
import Z from './components/shapes/Z'

class App extends Component {
  render() {
    return (
      <svg width="600" height="400" style={{ backgroundColor: '#111' }}>
        <I x={2} y={2} direction={Direction.UP} />
        <I x={5} y={2} direction={Direction.LEFT} />
        <O x={9} y={2} direction={Direction.UP} />
        <T x={13} y={2} direction={Direction.UP} />
        <T x={16} y={2} direction={Direction.RIGHT} />
        <T x={2} y={6} direction={Direction.DOWN} />
        <T x={6} y={6} direction={Direction.LEFT} />
        <S x={8} y={6} direction={Direction.UP} />
        <S x={12} y={6} direction={Direction.LEFT} />
        <Z x={15} y={6} direction={Direction.UP} />
        <Z x={19} y={6} direction={Direction.LEFT} />
        <J x={20} y={2} direction={Direction.UP} />
        <J x={23} y={2} direction={Direction.DOWN} />
        <J x={26} y={2} direction={Direction.LEFT} />
        <J x={23} y={7} direction={Direction.RIGHT} />
      </svg>
    )
  }
}

export default App
