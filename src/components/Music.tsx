import React from 'react'
import styled from 'styled-components'

const MusicIframe = styled.iframe`
  position: absolute;
  top: -20px;
  right: -20px;
`

/** Handles playing music, whenever the prop is true. */
const Music: React.FunctionComponent<{}> = () => (
  <MusicIframe
    width="10"
    height="10"
    src="https://www.youtube.com/embed/9Fv5cuYZFC0?controls=0&autoplay=1&loop=1"
    frameBorder={0}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  />
)

export default Music
