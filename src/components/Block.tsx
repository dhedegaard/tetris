import { darken } from "polished";
import { FC, memo } from "react";

const DEFAULT_COLOR = "#ccc";

interface Props {
  x: number;
  y: number;
  color?: string;
}

const Block: FC<Props> = (props) => (
  <rect
    width={19.5}
    height={19.5}
    x={props.x * 20}
    y={props.y * 20}
    color={props.color || DEFAULT_COLOR}
    fill={props.color || DEFAULT_COLOR}
    stroke={darken(0.1, props.color || DEFAULT_COLOR)}
    strokeWidth={0.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export default memo(Block);
