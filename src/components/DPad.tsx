import { memo, MouseEventHandler, useCallback } from "react";
import { attemptToDoMove } from "../store/actions/game";
import { useTetrisDispatch } from "../store/tetris";
import styles from "./DPad.module.css";

export const DPad = memo(function DPad() {
  const dispatch = useTetrisDispatch();

  const handleClickRotate = useCallback<MouseEventHandler<SVGElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(attemptToDoMove("ROTATE"));
    },
    [dispatch]
  );
  const handleClickLeft = useCallback<MouseEventHandler<SVGElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(attemptToDoMove("LEFT"));
    },
    [dispatch]
  );
  const handleClickRight = useCallback<MouseEventHandler<SVGElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(attemptToDoMove("RIGHT"));
    },
    [dispatch]
  );
  const handleClickDown = useCallback<MouseEventHandler<SVGElement>>(
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
        color="#999"
        strokeWidth={0}
      >
        <rect
          fill="currentFill"
          x={1}
          y={0}
          width={1}
          height={3}
          rx={0.2}
          className="pointer-events-none"
        />
        <rect
          fill="currentFill"
          x={0}
          y={1}
          width={3}
          height={1}
          rx={0.2}
          className="pointer-events-none"
        />

        <circle
          cx={1.5}
          cy={0.5}
          r={0.3}
          strokeWidth={0.03}
          stroke="currentColor"
          className="pointer-events-none"
        />
        <circle
          cx={0.5}
          cy={1.5}
          r={0.3}
          strokeWidth={0.03}
          stroke="currentColor"
          className="pointer-events-none"
        />
        <circle
          cx={2.5}
          cy={1.5}
          r={0.3}
          strokeWidth={0.03}
          stroke="currentColor"
          className="pointer-events-none"
        />
        <circle
          cx={1.5}
          cy={2.5}
          r={0.3}
          strokeWidth={0.03}
          stroke="currentColor"
          className="pointer-events-none"
        />

        <rect
          fill="transparent"
          x={1}
          y={0}
          width={1}
          height={1}
          onClick={handleClickRotate}
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

      <svg
        viewBox="0 0 1 1"
        className={`${styles.DPad} fixed bottom-[80px] right-6 w-[60px]`}
        fill="#ccc"
        color="#999"
      >
        <circle
          cx={0.5}
          cy={0.5}
          r={0.5}
          fill="currentFill"
          onClick={handleClickRotate}
        />
        <circle
          cx={0.5}
          cy={0.5}
          r={0.35}
          strokeWidth={0.025}
          stroke="currentColor"
          className="pointer-events-none"
        />
      </svg>
    </>
  );
});
