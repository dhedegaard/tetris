import { memo, SVGProps } from 'react'

const Grid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    preserveAspectRatio="xMinYMin"
    viewBox="0 0 10 20"
    fill="#000"
    className="aspect-[1 / 2] box-border block h-full w-full bg-black"
    {...props}
  />
)

export default memo(Grid)
