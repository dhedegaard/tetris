import { Metadata, Viewport } from 'next'
import { memo, ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Tetris',
  description: 'Tetris',
  formatDetection: { telephone: false },
  icons: '/icon-512x512.png',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black',
    startupImage: '/icon-512x512.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

interface Props {
  children: ReactNode
}
export default memo<Props>(function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  )
})
