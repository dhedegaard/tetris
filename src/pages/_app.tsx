import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Tetris</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
