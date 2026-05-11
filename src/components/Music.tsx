import { memo } from 'react'

/** Handles playing music, whenever the prop is true. */
export const Music = memo(function Music() {
  return (
    <iframe
      className="absolute top-[-20px] right-[-20px]"
      width="10"
      height="10"
      src="https://www.youtube.com/embed/NmCCQxVBfyM?controls=0&autoplay=1&loop=1&playlist=NmCCQxVBfyM"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  )
})
