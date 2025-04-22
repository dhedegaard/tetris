import { memo, Reducer, SVGProps, useEffect, useMemo, useReducer } from 'react'
import { match } from 'ts-pattern'
import { Coordinate } from '../store/slices/blocks'
import { Block } from './Block'
import { ShapeElement } from './shapes'

export type Coordinates = Coordinate[]

export interface ShapeDrawerProps {
  renderType: 'ghost' | 'normal'
  coordinates: Coordinates
  shape: ShapeElement
  x: number
  y: number
}

export const ShapeDrawer = memo<ShapeDrawerProps>(function ShapeDrawer({
  x,
  y,
  shape,
  coordinates,
  renderType,
}) {
  const [{ curX, curY, oldShape }, dispatch] = useReducer(reducer, {
    curX: x,
    curY: y,
    oldX: x,
    oldY: y,
    oldShape: shape,
  })

  useEffect(() => {
    dispatch({ x, y, shape })
  }, [x, y, shape])

  const blocks = useMemo(
    () =>
      coordinates.map((coord, index) => (
        <Block key={`elem_${shape.color}_${index.toString()}`} {...coord} />
      )),
    [coordinates, shape.color]
  )

  const transform = useMemo(
    () =>
      `translate(${String(oldShape === shape ? curX : x)}, ${String(oldShape === shape ? curY : y)})`,
    [curX, curY, oldShape, shape, x, y]
  )

  return (
    <g
      transform={transform}
      color={shape.color}
      fill={shape.color}
      opacity={useMemo(
        () =>
          match(renderType)
            .returnType<SVGProps<SVGGElement>['opacity']>()
            .with('ghost', () => 0.4)
            .with('normal', () => undefined)
            .exhaustive(),
        [renderType]
      )}
      className="will-change-transform"
    >
      {blocks}
    </g>
  )
})

const reducer: Reducer<
  {
    curX: number
    curY: number
    oldX: number
    oldY: number
    oldShape: ShapeElement
  },
  { x: number; y: number; shape: ShapeElement }
> = (state, action) => ({
  ...state,
  curX: action.x,
  curY: action.y,
  oldX: action.shape === state.oldShape ? state.curX : action.x,
  oldY: action.shape === state.oldShape ? state.curY : action.y,
  oldShape: action.shape,
})
