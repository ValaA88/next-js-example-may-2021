import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const imgStyles = css`
  max-width: 100%;
`;

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h1>Home</h1>

        {/*
          This is currently crashing on my M1 MacBook:

          <h2>Using the `Image` component from Next.js</h2>
          <Image
            src="/karl.jpg"
            alt="llamas mit huten"
            width="1280"
            height="720"
          />
        */}

        <h2>Using the HTML `img` tag</h2>
        <img css={imgStyles} src="/karl.jpg" alt="llamas mit huten" />
      </div>
    </Layout>
  );
}