import shuffle from 'lodash-es/shuffle'
import uniqueId from 'lodash-es/uniqueId'
import { FC, memo, useMemo } from 'react'
import { match } from 'ts-pattern'
import { Coordinates, ShapeDrawer, type ShapeDrawerProps } from '../ShapeDrawer'
import { COLOR_I, I } from './I'
import { COLOR_J, J } from './J'
import { COLOR_L, L } from './L'
import { COLOR_O, O } from './O'
import { COLOR_S, S } from './S'
import { COLOR_T, T } from './T'
import { COLOR_Z, Z } from './Z'

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export const directionToRotation = (direction: Direction): number =>
  match(direction)
    .returnType<number>()
    .with('UP', () => 270)
    .with('LEFT', () => 180)
    .with('DOWN', () => 90)
    .with('RIGHT', () => 0)
    .exhaustive()

/** Returns the new direction based on a current direction. */
export const nextDirection = (direction: Direction): Direction =>
  match(direction)
    .returnType<Direction>()
    .with('UP', () => 'RIGHT')
    .with('RIGHT', () => 'DOWN')
    .with('DOWN', () => 'LEFT')
    .with('LEFT', () => 'UP')
    .exhaustive()

export interface ShapeProps {
  x: number
  y: number
  direction: Direction
}

export type Shape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'
export const SHAPES = Object.freeze(['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as Shape[])

export const calculateCoordinates = (shape: Shape, shapeProps: ShapeProps): Coordinates =>
  match(shape)
    .returnType<Coordinates>()
    .with('I', () => I(shapeProps))
    .with('J', () => J(shapeProps))
    .with('L', () => L(shapeProps))
    .with('O', () => O(shapeProps))
    .with('S', () => S(shapeProps))
    .with('T', () => T(shapeProps))
    .with('Z', () => Z(shapeProps))
    .exhaustive()

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

interface Props extends ShapeProps, Pick<ShapeDrawerProps, 'renderType'> {
  shape: ShapeElement
}

/** Renders a given shape. */
export const ShapeRenderer: FC<Props> = memo(function ShapeRenderer({
  shape,
  x,
  y,
  direction,
  renderType,
}) {
  const coordinates = useMemo(
    () =>
      calculateCoordinates(shape.shape, {
        direction,
        x: 0,
        y: 0,
      }),
    [direction, shape]
  )

  return <ShapeDrawer shape={shape} x={x} y={y} coordinates={coordinates} renderType={renderType} />
})

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
