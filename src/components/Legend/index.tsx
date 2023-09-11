import isEqual from "lodash/isEqual";
import { FC, memo } from "react";
import { ShapeElement } from "../shapes";
import styles from "./index.module.css";
import Level from "./Level";
import NextShape from "./NextShape";
import Score from "./Score";

interface Props {
  score: number;
  level: number;
  peekShapes: readonly ShapeElement[];
}

const Legend: FC<Props> = ({ score, level, peekShapes }) => (
  <div className={styles["legendContainer"]}>
    <div className="flex flex-col gap-[8px] items-stretch">
      <Score score={score} />
      <Level level={level} />
    </div>
    <NextShape nextShapes={peekShapes} />
  </div>
);

export default memo(Legend, isEqual);
