import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Tetris</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
