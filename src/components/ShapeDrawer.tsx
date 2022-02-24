import styled from "@emotion/styled";
import { FC, useLayoutEffect, useMemo, useRef, useState } from "react";
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

const coordToTranslateTransform = (x: number, y: number) =>
  `translate(${x}, ${y})`;

const ShapeDrawer: FC<Props> = ({ x, y, shape, coordinates }) => {
  const [transform, set] = useState(coordToTranslateTransform(x, y));

  const animateTransformRef = useRef<SVGAnimateTransformElement>(null);

  const [oldXY, setOldXY] = useState({ x, y });
  useLayoutEffect(() => {
    const callback = () => {
      set(coordToTranslateTransform(x, y));
    };
    const elem = animateTransformRef.current;
    elem?.addEventListener("beginEvent", callback);
    elem?.beginElement();
    return () => {
      elem?.endElement();
      elem?.removeEventListener("beginEvent", callback);
      callback();
      setOldXY({ x, y });
    };
  }, [x, y]);

  const { color } = shape;
  const blocks = useMemo(
    () =>
      coordinates.map((coord, index) => (
        <Block key={`elem_${color}_${index}`} {...coord} />
      )),
    [color, coordinates]
  );

  return (
    <G transform={transform} color={color} fill={color}>
      <animateTransform
        ref={animateTransformRef}
        attributeName="transform"
        attributeType="XML"
        type="translate"
        from={`${oldXY.x}, ${oldXY.y}`}
        to={`${x}, ${y}`}
        dur="30ms"
        repeatCount="1"
        restart="whenNotActive"
      />
      {blocks}
    </G>
  );
};
const G = styled.g`
  transform-origin: 50% 50%;
`;

export default ShapeDrawer;
