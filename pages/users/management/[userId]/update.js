import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../../../components/Layout';

// PROBABLY DO NOT COPY
// You probably want to integrate this directly into
// your single item page instead
export default function UpdateDontCopy(props) {
  const [user, setUser] = useState(props.user);
  const [draftUser, setDraftUser] = useState(user);

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
          Update page for {user.firstName} {user.lastName}
        </title>
      </Head>

      <h1>Update Page</h1>

      <div>id: {user.id}</div>
      <div>firstName: {user.firstName}</div>
      <div>lastName: {user.lastName}</div>

      <div>
        <input
          value={draftUser.firstName}
          onChange={(event) => {
            const editedUser = {
              ...draftUser,
              firstName: event.currentTarget.value,
            };
            setDraftUser(editedUser);
          }}
        />
      </div>

      <div>
        <input
          value={draftUser.lastName}
          onChange={(event) => {
            const editedUser = {
              ...draftUser,
              lastName: event.currentTarget.value,
            };
            setDraftUser(editedUser);
          }}
        />
      </div>

      <button
        onClick={async () => {
          const response = await fetch(`/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: draftUser.firstName,
              lastName: draftUser.lastName,
            }),
          });
          const { user: updatedUser } = await response.json();
          setUser(updatedUser);
        }}
      >
        Save
      </button>

      <button
        onClick={() => {
          if (!window.confirm(`Really discard?`)) {
            return;
          }

          setDraftUser(user);
        }}
      >
        Discard
      </button>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    `${process.env.API_BASE_URL}/users/${context.query.userId}`,
  );
  const { user } = await response.json();

  return {
    props: {
      user: user,
    },
  };
}
