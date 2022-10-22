import styled from "@emotion/styled";
import { memo, useMemo } from "react";
import useBlocks from "../hooks/useBlocks";
import useShape from "../hooks/useShape";

interface Props {
  x: number;
  y: number;
  width: number;
  side: "left" | "right";
}

const Bounds = ({ x, y, width, side, ...props }: Props) => {
  const {
    shape: { color },
  } = useShape();
  // TODO: Calc y2
  const { blocks } = useBlocks();

  const renderedX = useMemo(() => {
    switch (side) {
      case "left":
        return x + width;
      case "right":
        return x + 1 - width;
      default:
        throw new TypeError(`Invalid side: ${side}`);
    }
  }, [side, width, x]);

  return (
    <line
      {...props}
      x1={renderedX}
      y1={y + 1}
      x2={renderedX}
      y2={20}
      stroke={color}
      strokeWidth={width}
    />
  );
};

Bounds.displayName = "Bounds";

export default styled(memo(Bounds))`
  // TODO: This is sort of wrong, fix it later.
  transition: all 40ms ease;
  opacity: 0.3;
`;
