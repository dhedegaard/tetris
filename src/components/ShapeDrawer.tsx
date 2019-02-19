import React, { FunctionComponent } from 'react'
import Block from './Block'

export interface Coordinate {
  x: number
  y: number
}

export type Coordinates = Coordinate[]

interface Props {
  color: string
  coordinates: Coordinates
}
const ShapeDrawer: FunctionComponent<Props> = ({ color, coordinates }) => (
  <>
    {coordinates.map(coord => (
      <Block key={`elem_${coord.x}_${coord.y}`} {...coord} color={color} />
    ))}
  </>
)

export default ShapeDrawer
