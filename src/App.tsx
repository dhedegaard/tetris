import React, { useEffect, useState } from 'react'
import Block from './components/Block'
import Grid from './components/Grid'
import { Coordinates } from './components/ShapeDrawer'
import {
  calculateCoordinates,
  Direction,
  getRandomShape,
  nextDirection,
  Shape,
  Shapes
} from './components/shapes'
import useTetris from './hooks'

const App: React.FunctionComponent = () => {
  const { direction, shape, position, blocks } = useTetris()

  return (
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
  )
}

export default App
