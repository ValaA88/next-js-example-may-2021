import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <h1>Register</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              username: username,
              password: password,
            }),
          });
          const { user: createdUser } = await response.json();

          // Navigate to the user's page when
          // they have been successfully created
          router.push(`/users/management/${createdUser.id}/read`);
        }}
      >
        <div>
          <label>
            firstName:
            <input
              data-cy="users-management-create-first-name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.currentTarget.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            lastName:
            <input
              data-cy="users-management-create-last-name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.currentTarget.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            username:
            <input
              data-cy="users-management-create-username"
              value={username}
              onChange={(event) => {
                setUsername(event.currentTarget.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            password:
            <input
              data-cy="users-management-create-password"
              value={password}
              type="password"
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>
        </div>

        <button>Register</button>
      </form>
    </Layout>
  );
}
