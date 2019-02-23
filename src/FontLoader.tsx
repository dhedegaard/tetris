import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalFontStyle = createGlobalStyle`
  html * {
    font-family: 'Press Start 2P', cursive !important;
  }
`

const FontLoader: React.FunctionComponent = () => {
  const [fontReady, setFontReady] = useState(false)

  return (
    <>
      <link
        rel={fontReady ? 'stylesheet' : 'preload'}
        as={fontReady ? undefined : 'style'}
        href="https://fonts.googleapis.com/css?family=Press+Start+2P"
        crossOrigin="anonymous"
        onLoad={() => setFontReady(true)}
      />
      {fontReady && <GlobalFontStyle />}
    </>
  )
}

export default FontLoader
