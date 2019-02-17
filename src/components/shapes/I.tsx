import React from 'react'
import { Direction, ShapeProps } from '.'
import Block from '../Block'

const COLOR = '#efefef'

const I: React.FunctionComponent<ShapeProps> = ({ x, y, direction }) => {
  switch (direction) {
    case Direction.UP:
    case Direction.DOWN:
      return (
        <>
          <Block color={COLOR} x={x} y={y - 1} />
          <Block color={COLOR} x={x} y={y} />
          <Block color={COLOR} x={x} y={y + 1} />
          <Block color={COLOR} x={x} y={y + 2} />
        </>
      )
    case Direction.LEFT:
    case Direction.RIGHT:
      return (
        <>
          <Block color={COLOR} x={x - 1} y={y} />
          <Block color={COLOR} x={x} y={y} />
          <Block color={COLOR} x={x + 1} y={y} />
          <Block color={COLOR} x={x + 2} y={y} />
        </>
      )
    default:
      throw new Error('Unhandle default case')
  }
}

export default I
