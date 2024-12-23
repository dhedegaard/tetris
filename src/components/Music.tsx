import { memo } from 'react'

/** Handles playing music, whenever the prop is true. */
export const Music = memo(function Music() {
  return (
    <iframe
      className="absolute right-[-20px] top-[-20px]"
      width="10"
      height="10"
      src="https://www.youtube.com/embed/NmCCQxVBfyM?controls=0&autoplay=1&loop=1"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  )
})
