import React, { useEffect, useState } from 'react'
import Grid from './components/Grid'
import { Direction, nextDirection, Shape, Shapes } from './components/shapes'

const App: React.FunctionComponent = () => {
  const [position, setPosition] = useState({ x: 5, y: 1 })
  const [shape, setShape] = useState<Shapes>('J')
  const [direction, setDirection] = useState(Direction.UP)

  useEffect(() => {
    const keypressHandler = (evt: KeyboardEvent) => {
      switch (evt.keyCode) {
        case 37: // left
          setPosition({ ...position, x: Math.max(position.x - 1, 0) })
          break
        case 39: // right
          setPosition({ ...position, x: Math.min(position.x + 1, 19) })
          break
        case 38: // up
          setDirection(nextDirection(direction))
          break
        default:
          console.log('Unknown keycode:', evt.keyCode)
      }
    }

    document.addEventListener('keydown', keypressHandler)
    return () => document.removeEventListener('keydown', keypressHandler)
  }, [])

  console.log('!!! RENDER')
  return (
    <Grid>
      <Shape
        direction={direction}
        shape={shape}
        x={position.x}
        y={position.y}
      />
    </Grid>
  )
}

export default App
