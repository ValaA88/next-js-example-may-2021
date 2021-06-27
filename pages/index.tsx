import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import karl from './karl.jpg';

const imgStyles = css`
  max-width: 100%;
`;

// function isAppleM1() {
//   if (typeof window === 'undefined') {
//     return process.arch === 'arm64' && process.platform === 'darwin';
//   } else {
//     const webGlContext = document.createElement('canvas').getContext('webgl');
//     const rendererExtension = webGlContext?.getExtension(
//       'WEBGL_debug_renderer_info',
//     );
//     const g =
//       (rendererExtension &&
//         webGlContext?.getParameter(
//           rendererExtension.UNMASKED_RENDERER_WEBGL,
//         )) ||
//       '';
//     return g.match(/Apple/) && !g.match(/Apple GPU/);
//   }
// }

export default function Home(props: { isAppleM1: boolean }) {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h1>Home</h1>

        {/*
          This is currently crashing on my M1 MacBook:
        */}

        <h2>Using the `Image` component from Next.js</h2>
        <Image
          src={karl}
          alt="llamas mit huten"
          placeholder="blur"
          unoptimized={
            process.env.NODE_ENV === 'development' && props.isAppleM1
          }
        />

        <h2>Using the HTML `img` tag</h2>
        <img css={imgStyles} src="/karl.jpg" alt="llamas mit huten" />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      isAppleM1: process.arch === 'arm64' && process.platform === 'darwin',
    },
  };
}
