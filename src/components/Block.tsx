import { FC, memo, SVGProps } from "react";

interface Props {
  x: number;
  y: number;
}

const Block: FC<Props & SVGProps<SVGRectElement>> = (props) => (
  <rect
    width={1}
    height={1}
    fill="currentFill"
    stroke="#000"
    strokeWidth={0.02}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export default memo(Block);
