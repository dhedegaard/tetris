import React, { Component } from 'react'
import { Direction } from './components/shapes'
import I from './components/shapes/I'
import O from './components/shapes/O'
import T from './components/shapes/T'

class App extends Component {
  render() {
    return (
      <svg width="400" height="400" style={{ backgroundColor: '#111' }}>
        <I x={2} y={2} direction={Direction.UP} />
        <I x={5} y={2} direction={Direction.LEFT} />
        <O x={9} y={2} direction={Direction.UP} />
        <T x={13} y={2} direction={Direction.UP} />
        <T x={16} y={2} direction={Direction.RIGHT} />
        <T x={2} y={6} direction={Direction.DOWN} />
        <T x={6} y={6} direction={Direction.LEFT} />
      </svg>
    )
  }
}

export default App
