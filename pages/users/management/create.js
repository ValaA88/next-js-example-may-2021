import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/Layout';

export default function CreateSingleUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Create page</title>
      </Head>

      <h1>Create Page</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch(`/api/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
            }),
          });
          const { user: createdUser } = await response.json();

          // Navigate to the user's page when
          // they have been successfully created
          router.push(`/users/management/${createdUser.id}/read`);
        }}
      >
        <div>
          <input
            data-cy="users-management-create-first-name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
          />
        </div>

        <div>
          <input
            data-cy="users-management-create-last-name"
            value={lastName}
            onChange={(event) => {
              setLastName(event.currentTarget.value);
            }}
          />
        </div>

        <button>Create User</button>
      </form>
    </Layout>
  );
}
