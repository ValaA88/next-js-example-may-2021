import Head from 'next/head';
import Layout from '../../components/Layout';

export default function SingleUser(props) {
  return (
    <Layout>
      <Head>
        <title>
          {props.user.firstName} {props.user.lastName}
        </title>
      </Head>

      <h1>
        {props.user.firstName} {props.user.lastName}
      </h1>
      <div>user id: {props.user.id}</div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // The name inside the square brackets of the filename
  // is inside of the `context.query` object
  const userId = context.query.userId;
  console.log('userId', userId);

  const { users } = await import('../../util/database');

  const user = users.find((u) => u.id === userId);

  return {
    props: {
      user: user,
    },
  };
}
