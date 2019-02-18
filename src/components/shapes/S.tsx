import React from 'react'
import { Direction, ShapeProps } from '.'
import Block from '../Block'

const COLOR = 'green'

const S: React.FunctionComponent<ShapeProps> = ({ x, y, direction }) => {
  switch (direction) {
    case Direction.UP:
    case Direction.DOWN:
      return (
        <>
          <Block x={x} y={y - 1} color={COLOR} />
          <Block x={x} y={y} color={COLOR} />
          <Block x={x + 1} y={y} color={COLOR} />
          <Block x={x + 1} y={y + 1} color={COLOR} />
        </>
      )
    case Direction.LEFT:
    case Direction.RIGHT:
      return (
        <>
          <Block x={x} y={y} color={COLOR} />
          <Block x={x + 1} y={y} color={COLOR} />
          <Block x={x} y={y + 1} color={COLOR} />
          <Block x={x - 1} y={y + 1} color={COLOR} />
        </>
      )
  }
}

export default S
