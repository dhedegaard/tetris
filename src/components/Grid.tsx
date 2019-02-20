import React from 'react'

const HEIGHT = 20
const WIDTH = 10
const COLOR = '#efefef'

const Grid: React.FunctionComponent = props => {
  const lines = []
  for (let x = 20; x < WIDTH * 20; x += 20) {
    lines.push(
      <line
        key={`grid_x_${x}`}
        x1={x}
        x2={x}
        y1={0}
        y2={HEIGHT * 20}
        stroke={COLOR}
      />
    )
  }
  for (let y = 20; y < HEIGHT * 20; y += 20) {
    lines.push(
      <line
        key={`grid_y_${y}`}
        x1={0}
        x2={WIDTH * 20}
        y1={y}
        y2={y}
        stroke={COLOR}
      />
    )
  }
  return (
    <svg
      width={WIDTH * 20}
      height={HEIGHT * 20}
      style={{
        backgroundColor: '#222',
        display: 'block'
      }}
    >
      {lines}
      {props.children}
    </svg>
  )
}

export default Grid
