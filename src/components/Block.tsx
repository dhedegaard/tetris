import styled from "@emotion/styled";
import { FC, memo, SVGProps } from "react";

interface Props {
  x: number;
  y: number;
}

const Block: FC<Props & SVGProps<SVGRectElement>> = (props) => (
  <Rect width={1} height={1} {...props} />
);

export default memo(Block);

const Rect = styled.rect`
  color: inherit;
  stroke: #000;
  stroke-width: 0.02;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
