import { css, Global } from '@emotion/react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          /* More natural sizing model */
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          body {
            /* Remove the default margin on the body */
            margin: 0;

            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
              Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
          }
        `}
      />

      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
