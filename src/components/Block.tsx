import { darken } from "polished";
import { FC, memo } from "react";

const DEFAULT_COLOR = "#ccc";

interface Props {
  x: number;
  y: number;
  color?: string;
}

const Block: FC<Props> = ({ x, y, color }) => (
  <rect
    width={1}
    height={1}
    x={x}
    y={y}
    fill={color || DEFAULT_COLOR}
    stroke="#000"
    strokeWidth={0.02}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export default memo(Block);
