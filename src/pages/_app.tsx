import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import { font } from '../font'
import '../styles/global.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Tetris</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <Component {...pageProps} className={font.className} />
    </>
  )
}

export default MyApp
