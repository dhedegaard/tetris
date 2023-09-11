import isEqual from "lodash/isEqual";
import { FC, memo } from "react";
import { useIsBrowser } from "../../hooks/useIsBrowser";
import { Direction, ShapeRenderer, ShapeElement } from "../shapes";
import styles from "./NextShape.module.css";

interface Props {
  nextShapes: readonly ShapeElement[];
}

const NextShape: FC<Props> = ({ nextShapes }) => {
  const isBrowser = useIsBrowser();
  if (!isBrowser) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Next:</div>
      {nextShapes.map((shape) => (
        <svg
          viewBox="0 0 5 3"
          width="100%"
          key={shape.key}
          className="block m-[10px]"
        >
          <ShapeRenderer direction="RIGHT" shape={shape} x={1} y={1} />
        </svg>
      ))}
    </div>
  );
};

export default memo(NextShape, isEqual);
