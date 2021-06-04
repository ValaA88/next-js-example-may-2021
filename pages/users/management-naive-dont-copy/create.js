import Head from 'next/head';
import Layout from '../../../components/Layout';

// DO NOT COPY
export default function CreateDontCopy(props) {
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
          Create page for {props.user.firstName} {props.user.lastName}
        </title>
      </Head>

      <h1>Create Page</h1>

      <div>id: {props.user.id}</div>
      <div>first_name: {props.user.firstName}</div>
      <div>last_name: {props.user.lastName}</div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log('ctx query', context.query);

  const firstName = context.query.firstName;
  const lastName = context.query.lastName;

  const { insertUser } = await import('../../../util/database');

  const user = await insertUser(firstName, lastName);

  return {
    props: {
      user: user || null,
    },
  };
}
