import { memo, SVGProps } from 'react'

const Grid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    preserveAspectRatio="xMinYMin"
    viewBox="0 0 10 20"
    fill="#000"
    className="box-border block aspect-[1/2] size-full bg-black"
    {...props}
  />
)

export default memo(Grid)
