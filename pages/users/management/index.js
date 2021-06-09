import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';

export default function CreateDontCopy() {
  return (
    <Layout>
      <Head>
        <title>User Management</title>
      </Head>

      <h1>User management page</h1>

      <Link href="/users/management/create">
        <a data-cy="users-management-create-link">Create</a>
      </Link>
      <br />
      <Link href="/users/management/read">
        <a data-cy="users-management-read-link">Read</a>
      </Link>
    </Layout>
  );
}
