import { memo, SVGProps } from "react";
import styles from "./Block.module.css";

interface Props extends SVGProps<SVGRectElement> {
  x: number;
  y: number;
}

const Block = (props: Props) => (
  <rect
    {...props}
    width={1}
    height={1}
    className={`stroke-black stroke-[0.02] ${styles["block"]}`}
  />
);

export default memo(Block);
