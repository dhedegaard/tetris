import { FC, memo, useMemo } from "react";
import styles from "./Level.module.css";

interface Props {
  level: number;
}
const Level: FC<Props> = ({ level }) => (
  <div className={styles["container"]}>
    <div className={styles["title"]}>Level:</div>
    <div className={styles["text"]}>
      {useMemo(() => Math.min(level, 99).toString().padStart(2, "0"), [level])}
    </div>
  </div>
);

export default memo(Level);
