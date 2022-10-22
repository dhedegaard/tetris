import styled from "@emotion/styled";
import { memo } from "react";

interface Props {
  x: number;
  y: number;
  width: number;
}

const Bounds = ({ x, y, width, ...props }: Props) => (
  <line
    {...props}
    x1={x}
    y1={y}
    x2={x}
    y2={20}
    // TODO:
    stroke="red"
    strokeWidth={width}
  />
);

Bounds.displayName = "Bounds";

export default styled(memo(Bounds))`
  // TODO: This is sort of wrong, fix it later.
  transition: all 40ms ease;
  opacity: 0.5;
`;
