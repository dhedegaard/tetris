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
}
const ShapeDrawer: FC<Props> = ({ color, coordinates }) => (
  <>
    {coordinates.map((coord, index) => (
      <Block key={`elem_${color}_${index}`} {...coord} color={color} />
    ))}
  </>
);

export default ShapeDrawer;
