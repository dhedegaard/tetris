import 'polished'
import { darken } from 'polished'
import React from 'react'

interface Props {
  x: number
  y: number
  color: string
}

const Block: React.FunctionComponent<Props> = props => (
  <rect
    width={20} // TODO, fetch from a context or something.
    height={20} // TODO, fetch from a context or something.
    x={props.x * 20}
    y={props.y * 20}
    color={props.color}
    fill={props.color}
    stroke={darken(0.2, props.color)}
  />
)

export default Block
