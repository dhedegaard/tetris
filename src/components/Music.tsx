import { FC } from 'react'

/** Handles playing music, whenever the prop is true. */
const Music: FC<{}> = () => (
  <iframe
    className="absolute top-[-20px] right-[-20px]"
    width="10"
    height="10"
    src="https://www.youtube.com/embed/NmCCQxVBfyM?controls=0&autoplay=1&loop=1"
    frameBorder={0}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  />
)

export default Music
