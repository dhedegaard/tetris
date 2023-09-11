import { memo, SVGProps } from 'react'

const Grid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    preserveAspectRatio="xMinYMin"
    viewBox="0 0 10 20"
    fill="#000"
    className="bg-black block box-border w-full h-full aspect-[1 / 2]"
    {...props}
  />
)

export default memo(Grid)
