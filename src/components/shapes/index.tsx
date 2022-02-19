import { FC, useMemo } from "react";
import ShapeDrawer, { Coordinates } from "../ShapeDrawer";
import I, { COLOR_I } from "./I";
import J, { COLOR_J } from "./J";
import L, { COLOR_L } from "./L";
import O, { COLOR_O } from "./O";
import S, { COLOR_S } from "./S";
import T, { COLOR_T } from "./T";
import Z, { COLOR_Z } from "./Z";

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

/** Returns the new direction based on a current direction. */
export const nextDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.UP:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.LEFT;
    case Direction.LEFT:
      return Direction.UP;
  }
};

export interface ShapeProps {
  x: number;
  y: number;
  direction: Direction;
  children?: undefined;
}

export type Shapes = "I" | "J" | "L" | "O" | "S" | "T" | "Z";
export const SHAPES = Object.freeze([
  "I",
  "J",
  "L",
  "O",
  "S",
  "T",
  "Z",
] as Shapes[]);

export const calculateCoordinates = (
  shape: Shapes,
  shapeProps: ShapeProps
): Coordinates => {
  switch (shape) {
    case "I":
      return I(shapeProps);
    case "J":
      return J(shapeProps);
    case "L":
      return L(shapeProps);
    case "O":
      return O(shapeProps);
    case "S":
      return S(shapeProps);
    case "T":
      return T(shapeProps);
    case "Z":
      return Z(shapeProps);
  }
};

export const colorFromShape = (shape: Shapes): string => colorMap[shape];

const colorMap: { [key in Shapes]: string } = {
  I: COLOR_I,
  J: COLOR_J,
  L: COLOR_L,
  O: COLOR_O,
  S: COLOR_S,
  T: COLOR_T,
  Z: COLOR_Z,
};

/** Renders a given shape. */
export const Shape: FC<
  ShapeProps & { shape: { shape: Shapes; key: string } }
> = ({ shape: { shape, key }, x, y, direction }) => {
  const coordinates = useMemo(
    () =>
      calculateCoordinates(shape, {
        direction,
        x: 0,
        y: 0,
      }),
    [direction, shape]
  );

  return (
    <ShapeDrawer
      key={key}
      x={x}
      y={y}
      coordinates={coordinates}
      color={colorMap[shape]}
    />
  );
};

export const getRandomShape = (): Shapes =>
  SHAPES[Math.floor(Math.random() * (SHAPES.length - 1))]!;
