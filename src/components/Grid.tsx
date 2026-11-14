import { memo, type SVGProps } from 'react'
import { BOARD_HEIGHT, BOARD_WIDTH } from '../store/slices/blocks'

export const Grid = memo<SVGProps<SVGSVGElement>>(function Grid(props) {
  return (
    <svg
      preserveAspectRatio="xMinYMin"
      viewBox={`0 0 ${String(BOARD_WIDTH)} ${String(BOARD_HEIGHT)}`}
      fill="#000"
      className="box-border block aspect-[1/2] size-full bg-black"
      {...props}
    />
  )
})
