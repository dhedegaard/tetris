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

  // Go down until the next block with a higher y value is found, and stop
  // there. Or proceed to the max y value of the board.
  const { blocks } = useBlocks();
  const y2 = useMemo(
    () =>
      blocks.filter((e) => e.x === x && e.y >= y).sort((a, b) => a.y - b.y)[0]
        ?.y ?? 20,
    [blocks, x, y]
  );

  // Determine the absolute X values to render based on the side, the width and
  // the current X position.
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
      y2={y2}
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
