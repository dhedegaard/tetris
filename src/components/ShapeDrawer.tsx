import styled from "@emotion/styled";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { ShapeElement } from "../hooks/reducer";
import Block from "./Block";

export interface Coordinate {
  x: number;
  y: number;
}

export type Coordinates = Coordinate[];

interface Props {
  coordinates: Coordinates;
  shape: ShapeElement;
  x: number;
  y: number;
}

const coordToTranslateTransform = (x: number, y: number) =>
  `translate(${x}, ${y})`;
const ANIMATION_DURATION = 40;

const ShapeDrawer: FC<Props> = ({ x, y, shape, coordinates }) => {
  const oldX = useRef(x);
  const oldY = useRef(y);
  const oldShapeKey = useRef(shape.key);

  const [transform, set] = useState(coordToTranslateTransform(x, y));

  useLayoutEffect(() => {
    // When we get a new shape, clear the refs and start over.
    if (oldShapeKey.current !== shape.key) {
      oldX.current = x;
      oldY.current = y;
      oldShapeKey.current = shape.key;
      set(coordToTranslateTransform(x, y));
      return;
    }

    // Fetch the old coordinates and replace the refs.
    const x1 = oldX.current;
    const y1 = oldY.current;
    oldX.current = x;
    oldY.current = y;

    // Make sure we start at the old position.
    set(coordToTranslateTransform(x1, y1));
    let start: number | undefined;
    const callback: FrameRequestCallback = (time) => {
      if (start == null) {
        start = time;
      }

      // Determine the percentage progress of the animation.
      const dt = time - start;
      const pct = Math.max(0, Math.min(1, dt / ANIMATION_DURATION));

      // Set the transform accordingly.
      set(coordToTranslateTransform((x - x1) * pct + x1, (y - y1) * pct + y1));

      // If the animation is done, stop the "loop".
      if (dt <= ANIMATION_DURATION) {
        handle = requestAnimationFrame(callback);
      }
    };

    // Start a RAF and cleanup when props change.
    let handle = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(handle);
  }, [shape.key, x, y]);

  const { color } = shape;
  return (
    <G transform={transform} color={color} fill={color}>
      {coordinates.map((coord, index) => (
        <Block key={`elem_${color}_${index}`} {...coord} color="inherit" />
      ))}
    </G>
  );
};
const G = styled.g`
  transform-origin: 50% 50%;
`;

export default ShapeDrawer;
