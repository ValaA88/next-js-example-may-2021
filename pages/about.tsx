import Head from 'next/head';
import Layout from '../components/Layout';

type Props = {
  username: string;
};

export default function About(props: Props) {
  return (
    <Layout username={props.username}>
      <Head>
        <title>About</title>
      </Head>

      <div data-cy="about-page-h1">About pagez</div>
    </Layout>
  );
}
