import React from 'react'
import { Direction, ShapeProps } from '.'
import Block from '../Block'

const COLOR = 'orange'

const L: React.FunctionComponent<ShapeProps> = ({ x, y, direction }) => {
  switch (direction) {
    case Direction.UP:
      return (
        <>
          <Block x={x} y={y - 1} color={COLOR} />
          <Block x={x} y={y} color={COLOR} />
          <Block x={x} y={y + 1} color={COLOR} />
          <Block x={x + 1} y={y + 1} color={COLOR} />
        </>
      )
    case Direction.RIGHT:
      return (
        <>
          <Block x={x - 1} y={y + 1} color={COLOR} />
          <Block x={x - 1} y={y} color={COLOR} />
          <Block x={x} y={y} color={COLOR} />
          <Block x={x + 1} y={y} color={COLOR} />
        </>
      )
    case Direction.DOWN:
      return (
        <>
          <Block x={x} y={y - 1} color={COLOR} />
          <Block x={x - 1} y={y - 1} color={COLOR} />
          <Block x={x} y={y} color={COLOR} />
          <Block x={x} y={y + 1} color={COLOR} />
        </>
      )
    case Direction.LEFT:
      return (
        <>
          <Block x={x - 1} y={y} color={COLOR} />
          <Block x={x} y={y} color={COLOR} />
          <Block x={x + 1} y={y} color={COLOR} />
          <Block x={x + 1} y={y + 1} color={COLOR} />
        </>
      )
  }
}

export default L
