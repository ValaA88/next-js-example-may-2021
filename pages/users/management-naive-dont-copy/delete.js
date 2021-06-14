import Head from 'next/head';
import Layout from '../../../components/Layout';
import { convertQueryValue } from '../../../util/context';

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

  const userId = convertQueryValue(context.query.userId);

  const { deleteUserById } = await import('../../../util/database');

  const user = await deleteUserById(userId);

  return {
    props: {
      user: user || null,
    },
  };
}
