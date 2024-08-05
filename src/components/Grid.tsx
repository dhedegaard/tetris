import { memo, SVGProps } from 'react'

export const Grid = memo<SVGProps<SVGSVGElement>>(function Grid(props) {
  return (
    <svg
      preserveAspectRatio="xMinYMin"
      viewBox="0 0 10 20"
      fill="#000"
      className="box-border block aspect-[1/2] size-full bg-black"
      {...props}
    />
  )
})
