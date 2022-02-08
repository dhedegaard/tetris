import { Direction, ShapeProps } from ".";
import { Coordinates } from "../ShapeDrawer";

export const COLOR_S = "green";

const S = ({ direction, x, y }: ShapeProps): Coordinates => {
  switch (direction) {
    case Direction.UP:
    case Direction.DOWN:
      return [
        { x, y: y - 1 },
        { x, y },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
      ];
    case Direction.LEFT:
    case Direction.RIGHT:
      return [
        { x, y },
        { x: x + 1, y },
        { x, y: y + 1 },
        { x: x - 1, y: y + 1 },
      ];
  }
};

export default S;
