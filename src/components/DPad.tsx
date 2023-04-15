import { memo, MouseEventHandler, useCallback } from "react";
import { attemptToDoMove } from "../store/actions/game";
import { useTetrisDispatch } from "../store/tetris";
import styles from "./DPad.module.css";

export const DPad = memo(function DPad() {
  const dispatch = useTetrisDispatch();

  const handleClickUp = useCallback<MouseEventHandler<SVGRectElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(attemptToDoMove("ROTATE"));
    },
    [dispatch]
  );
  const handleClickLeft = useCallback<MouseEventHandler<SVGRectElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(attemptToDoMove("LEFT"));
    },
    [dispatch]
  );
  const handleClickRight = useCallback<MouseEventHandler<SVGRectElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(attemptToDoMove("RIGHT"));
    },
    [dispatch]
  );
  const handleClickDown = useCallback<MouseEventHandler<SVGRectElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(attemptToDoMove("DOWN"));
    },
    [dispatch]
  );

  return (
    <>
      <svg
        viewBox="0 0 3 3"
        className={`${styles.DPad} fixed bottom-10 left-10 w-[150px]`}
        fill="#ccc"
      >
        <rect fill="currentFill" x={1} y={0} width={1} height={3} rx={0.2} />
        <rect fill="currentFill" x={0} y={1} width={3} height={1} rx={0.2} />

        <rect
          fill="transparent"
          x={1}
          y={0}
          width={1}
          height={1}
          onClick={handleClickUp}
        />
        <rect
          fill="transparent"
          x={0}
          y={1}
          width={1}
          height={1}
          onClick={handleClickLeft}
        />
        <rect
          fill="transparent"
          x={2}
          y={1}
          width={1}
          height={1}
          onClick={handleClickRight}
        />
        <rect
          fill="transparent"
          x={1}
          y={2}
          width={1}
          height={1}
          onClick={handleClickDown}
        />
      </svg>
    </>
  );
});
