import React from 'react'
import { ShapeProps } from '.'
import Block from '../Block'

const COLOR = 'yellow'

const O: React.FunctionComponent<ShapeProps> = ({ x, y }) => (
  <>
    <Block color={COLOR} x={x} y={y} />
    <Block color={COLOR} x={x + 1} y={y} />
    <Block color={COLOR} x={x} y={y + 1} />
    <Block color={COLOR} x={x + 1} y={y + 1} />
  </>
)

export default O
