import styled from "@emotion/styled";
import { FC, memo, Reducer, useEffect, useMemo, useReducer } from "react";
import { Coordinate } from "../store/slices/blocks";
import Block from "./Block";
import { ShapeElement } from "./shapes";

export type Coordinates = Coordinate[];

interface Props {
  coordinates: Coordinates;
  shape: ShapeElement;
  x: number;
  y: number;
}

const ShapeDrawer: FC<Props> = memo(({ x, y, shape, coordinates }) => {
  const [{ curX, curY, oldShape }, dispatch] = useReducer(reducer, {
    curX: x,
    curY: y,
    oldX: x,
    oldY: y,
    oldShape: shape,
  });

  useEffect(() => {
    dispatch({ x, y, shape });
  }, [x, y, shape]);

  const blocks = useMemo(
    () =>
      coordinates.map((coord, index) => (
        <Block key={`elem_${shape.color}_${index}`} {...coord} />
      )),
    [coordinates, shape.color]
  );

  const transform = useMemo(
    () =>
      `translate(${oldShape === shape ? curX : x}, ${
        oldShape === shape ? curY : y
      })`,
    [curX, curY, oldShape, shape, x, y]
  );

  return (
    <G transform={transform} color={shape.color} fill={shape.color}>
      {blocks}
    </G>
  );
});
ShapeDrawer.displayName = "ShapeDrawer";

const G = styled.g`
  transform-origin: 50% 50%;
  will-change: transform;
`;

export default ShapeDrawer;

const reducer: Reducer<
  {
    curX: number;
    curY: number;
    oldX: number;
    oldY: number;
    oldShape: ShapeElement;
  },
  { x: number; y: number; shape: ShapeElement }
> = (state, action) => ({
  ...state,
  curX: action.x,
  curY: action.y,
  oldX: action.shape === state.oldShape ? state.curX : action.x,
  oldY: action.shape === state.oldShape ? state.curY : action.y,
  oldShape: action.shape,
});
