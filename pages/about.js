import Head from 'next/head';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>

      <div data-cy="about-page-h1">About pagez</div>
    </Layout>
  );
}
