import shuffle from 'lodash/shuffle'
import uniqueId from 'lodash/uniqueId'
import { FC, useMemo } from 'react'
import ShapeDrawer, { Coordinates } from '../ShapeDrawer'
import I, { COLOR_I } from './I'
import J, { COLOR_J } from './J'
import L, { COLOR_L } from './L'
import O, { COLOR_O } from './O'
import S, { COLOR_S } from './S'
import T, { COLOR_T } from './T'
import Z, { COLOR_Z } from './Z'

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export const directionToRotation = (direction: Direction) => {
  switch (direction) {
    case 'UP':
      return 270
    case 'LEFT':
      return 180
    case 'DOWN':
      return 90
    case 'RIGHT':
      return 0
    default:
      // @ts-expect-error - exhaustive check
      throw new TypeError(`Unknown direction: ${direction.toString()}`)
  }
}

/** Returns the new direction based on a current direction. */
export const nextDirection = (direction: Direction): Direction => {
  switch (direction) {
    case 'UP':
      return 'RIGHT'
    case 'RIGHT':
      return 'DOWN'
    case 'DOWN':
      return 'LEFT'
    case 'LEFT':
      return 'UP'
    default:
      // @ts-expect-error - exhaustive check
      throw new TypeError(`Unknown direction: ${direction.toString()}`)
  }
}

export interface ShapeProps {
  x: number
  y: number
  direction: Direction
}

export type Shape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'
export const SHAPES = Object.freeze(['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as Shape[])

export const calculateCoordinates = (shape: Shape, shapeProps: ShapeProps): Coordinates => {
  switch (shape) {
    case 'I':
      return I(shapeProps)
    case 'J':
      return J(shapeProps)
    case 'L':
      return L(shapeProps)
    case 'O':
      return O(shapeProps)
    case 'S':
      return S(shapeProps)
    case 'T':
      return T(shapeProps)
    case 'Z':
      return Z(shapeProps)
    default:
      // @ts-expect-error - exhaustive check
      throw new TypeError(`Unknown shape: ${shape.toString()}`)
  }
}

export const colorFromShape = (shape: Shape): string => colorMap[shape]

const colorMap: { [key in Shape]: string } = {
  I: COLOR_I,
  J: COLOR_J,
  L: COLOR_L,
  O: COLOR_O,
  S: COLOR_S,
  T: COLOR_T,
  Z: COLOR_Z,
}

interface Props extends ShapeProps {
  shape: ShapeElement
}

/** Renders a given shape. */
export const ShapeRenderer: FC<Props> = ({ shape, x, y, direction }) => {
  const coordinates = useMemo(
    () =>
      calculateCoordinates(shape.shape, {
        direction,
        x: 0,
        y: 0,
      }),
    [direction, shape]
  )

  return <ShapeDrawer shape={shape} x={x} y={y} coordinates={coordinates} />
}

export const getRandomShapes = () =>
  shuffle(SHAPES).map((shape) => ({
    shape,
    key: uniqueId('shape-'),
    color: colorFromShape(shape),
    coordinates: calculateCoordinates(shape, {
      direction: 'RIGHT',
      x: 0,
      y: 0,
    }),
  }))

export interface ShapeElement {
  shape: Shape
  key: string
  color: string
  coordinates: Coordinates
}
