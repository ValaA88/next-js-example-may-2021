import Head from 'next/head';
import Layout from '../../../../components/Layout';

// DO NOT COPY
export default function DeleteDontCopy(props) {
  // Handle error if user does not exist
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
          Delete page for {props.user.firstName} {props.user.lastName}
        </title>
      </Head>

      <h1>Delete Page</h1>

      <div>id: {props.user.id}</div>
      <div>first_name: {props.user.firstName}</div>
      <div>last_name: {props.user.lastName}</div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log('ctx query', context.query);
  const response = await fetch(
    `${process.env.API_BASE_URL}/users/${context.query.userId}`,
    { method: 'DELETE' },
  );
  const { user } = await response.json();

  return {
    props: {
      user: user,
    },
  };
}
