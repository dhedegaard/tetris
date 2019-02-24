import React from 'react'
import styled from 'styled-components'

const Text = styled.text`
  text-transform: uppercase;
  font-size: 16px;
  user-select: none;
  pointer-events: none;
`
const RetryText = styled.text`
  text-transform: uppercase;
  font-size: 12px;
  user-select: none;
  pointer-events: none;
`

const GameOver: React.FunctionComponent = () => (
  <>
    <rect
      fill="#000"
      stroke="#fff"
      x={20 * 1 - 10}
      width={20 * 8 + 20}
      y={20 * 8 - 10}
      height={20 * 5}
    />
    <Text x={20 * 2 - 10} y={20 * 9 + 5} fill="#fff">
      Game over
    </Text>
    <RetryText x={20 * 2 - 10} y={20 * 11 - 5} fill="#fff" width={20 * 7}>
      Press 'r' to
    </RetryText>
    <RetryText x={20 * 2 + 10} y={20 * 12 - 5} fill="#fff" width={20 * 7}>
      try again
    </RetryText>
  </>
)

export default GameOver
