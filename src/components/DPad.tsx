import { memo, MouseEventHandler } from 'react'
import { attemptToDoMove, MoveOperation } from '../store/actions/game'
import { tetrisStore } from '../store/tetris'
import styles from './DPad.module.css'

const onMove =
  (operation: MoveOperation): MouseEventHandler<SVGElement> =>
  (event) => {
    event.preventDefault()
    event.stopPropagation()
    attemptToDoMove(tetrisStore, operation)
  }
const handleClickRotate = onMove('ROTATE')
const handleClickLeft = onMove('LEFT')
const handleClickRight = onMove('RIGHT')
const handleClickDown = onMove('DOWN')

export const DPad = memo(function DPad() {
  return (
    <>
      <svg
        viewBox="0 0 3 3"
        className={`${styles['DPad'] as string} fixed bottom-10 left-10 w-[150px] max-w-[40vw]`}
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

        <rect fill="transparent" x={1} y={0} width={1} height={1} onClick={handleClickRotate} />
        <rect fill="transparent" x={0} y={1} width={1} height={1} onClick={handleClickLeft} />
        <rect fill="transparent" x={2} y={1} width={1} height={1} onClick={handleClickRight} />
        <rect fill="transparent" x={1} y={2} width={1} height={1} onClick={handleClickDown} />
      </svg>

      <svg
        viewBox="0 0 1 1"
        className={`${styles['DPad'] as string} fixed right-6 bottom-[80px] w-[60px]`}
        fill="#ccc"
        color="#999"
      >
        <circle cx={0.5} cy={0.5} r={0.5} fill="currentFill" onClick={handleClickRotate} />
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
  )
})
