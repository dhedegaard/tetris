import styles from "./Block.module.css";
import { FC, memo, SVGProps } from "react";

interface Props {
  x: number;
  y: number;
}

const Block: FC<Props & SVGProps<SVGRectElement>> = (props) => (
  <rect
    {...props}
    width={1}
    height={1}
    className={`stroke-black stroke-[0.02] ${styles.block}`}
  />
);

export default memo(Block);
