import styled from "@emotion/styled";
import { FC } from "react";
import Block from "./Block";

export interface Coordinate {
  x: number;
  y: number;
}

export type Coordinates = Coordinate[];

interface Props {
  color: string;
  coordinates: Coordinates;
  x: number;
  y: number;
}
const ShapeDrawer: FC<Props> = ({ x, y, color, coordinates }) => (
  <G transform={`translate(${x}, ${y})`} color={color} fill={color}>
    {coordinates.map((coord, index) => (
      <Block key={`elem_${color}_${index}`} {...coord} color="inherit" />
    ))}
  </G>
);
const G = styled.g`
  transform-origin: 50% 50%;
`;

export default ShapeDrawer;
