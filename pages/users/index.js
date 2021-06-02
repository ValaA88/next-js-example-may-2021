import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

// Props will come from getServerSide props object
// below
export default function Users(props) {
  console.log('props', props);
  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>

      <h1>Users</h1>
      <ul>
        {props.users.map((user) => (
          <li key={`user-${user.id}`}>
            <Link href={`/users/${user.id}`}>
              <a>
                {user.firstName} {user.lastName}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// Code written inside of getServerSideProps
// will ONLY be run on the server
//
// This allows you to do things like:
// - access the filesystem using fs / node:fs
// - read from a database
export async function getServerSideProps() {
  // This will cause an error (you cannot
  // import like this in a function):
  //
  // import { users } from '../../util/database';

  const { getUsers } = await import('../../util/database');

  const users = await getUsers();

  // This console.log doesn't show up in the browser
  //
  // It will ONLY show up in Node.js (because this
  // code is ONLY running on the server)
  console.log('users', users);

  return {
    props: {
      users: users,
    },
  };
}
