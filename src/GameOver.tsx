import React from 'react'
import styled from 'styled-components'

const Text = styled.text`
  font-family: monospace;
  text-transform: uppercase;
  font-size: 22px;
`

const GameOver: React.FunctionComponent = () => (
  <>
    <rect
      fill="#000"
      stroke="#fff"
      x={20 * 1}
      width={20 * 8}
      y={20 * 8}
      height={20 * 4}
    />
    <Text x={20 * 2} y={20 * 10} fill="#fff">
      Game-over
    </Text>
  </>
)

export default GameOver
