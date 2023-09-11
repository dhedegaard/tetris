import { Direction, ShapeProps } from ".";
import { Coordinates } from "../ShapeDrawer";

export const COLOR_T = "#ec10ec";

const T = ({ direction, x, y }: ShapeProps): Coordinates => {
  const result: Coordinates = [{ x, y }];
  if (direction !== "DOWN") {
    result.push({ x, y: y - 1 });
  }
  if (direction !== "LEFT") {
    result.push({ x: x + 1, y });
  }
  if (direction !== "UP") {
    result.push({ x, y: y + 1 });
  }
  if (direction !== "RIGHT") {
    result.push({ x: x - 1, y });
  }
  return result;
};

export default T;
