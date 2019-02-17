import React from 'react'
import { Direction, ShapeProps } from '.'
import Block from '../Block'

const COLOR = 'purple'

const T: React.FunctionComponent<ShapeProps> = ({ x, y, direction }) => (
  <>
    <Block x={x} y={y} color={COLOR} />
    {direction !== Direction.DOWN && <Block x={x} y={y - 1} color={COLOR} />}
    {direction !== Direction.LEFT && <Block x={x + 1} y={y} color={COLOR} />}
    {direction !== Direction.UP && <Block x={x} y={y + 1} color={COLOR} />}
    {direction !== Direction.RIGHT && <Block x={x - 1} y={y} color={COLOR} />}
  </>
)

export default T
