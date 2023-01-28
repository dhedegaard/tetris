import { FC, memo } from "react";
import styles from "./Score.module.css";

interface Props {
  score: number;
}
const Score: FC<Props> = ({ score }) => (
  <div className={styles.container}>
    <div className={styles.title}>Score:</div>
    <div className={styles.text}>
      {Math.min(score, 99999999).toString().padStart(8, "0")}
    </div>
  </div>
);

export default memo(Score);
