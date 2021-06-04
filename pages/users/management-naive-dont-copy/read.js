import Head from 'next/head';
import Layout from '../../../components/Layout';

// DO NOT COPY
export default function ReadDontCopy(props) {
  // Show message if user does not exist
  if (!props.user) {
    return (
      <Layout>
        <Head>
          <title>User not found!</title>
        </Head>
        User not found
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>
          Read page for {props.user.firstName} {props.user.lastName}
        </title>
      </Head>

      <h1>Read Page</h1>

      <div>id: {props.user.id}</div>
      <div>first_name: {props.user.firstName}</div>
      <div>last_name: {props.user.lastName}</div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log('ctx query', context.query);

  const userId = context.query.userId;

  const { getUserById } = await import('../../../util/database');

  const user = await getUserById(userId);

  return {
    props: {
      user: user || null,
    },
  };
}
