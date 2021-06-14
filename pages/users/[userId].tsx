import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { convertQueryValue } from '../../util/context';
import {
  addClapByUserId,
  parseCookieValue,
  toggleFollowingUserByUserId,
} from '../../util/cookies';
import { User } from '../../util/types';

type Props = {
  // user: User | undefined;
  user?: User;
  following: number[];
  claps: { id: number; claps: number }[];
};

export default function SingleUser(props: Props) {
  console.log('props', props);
  const [following, setFollowing] = useState(props.following);

  const user = props.user;

  // Show message if user does not exist
  if (!user) {
    return (
      <Layout>
        <Head>
          <title>User not found!</title>
        </Head>

        <div data-cy="user-page-user-not-found">User not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>
          {user.firstName} {user.lastName}
        </title>
      </Head>

      <h1 data-cy={`user-page-user-${user.id}`}>
        {user.firstName} {user.lastName}
      </h1>
      <div>user id: {user.id}</div>
      <br />
      <button
        onClick={() => {
          // Avoid using the document.cookie
          // API - it is built in a strange
          // way and it's hard to use
          //
          // document.cookie = ''

          // Instead, use the js-cookie library
          // to set and get your cookies
          setFollowing(toggleFollowingUserByUserId(user.id));
        }}
      >
        {following.includes(user.id) ? 'Unfollow' : 'Follow'}
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          // Avoid using the document.cookie
          // API - it is built in a strange
          // way and it's hard to use
          //
          // document.cookie = ''

          // Instead, use the js-cookie library
          // to set and get your cookies
          addClapByUserId(user.id);
        }}
      >
        Clap
      </button>
      {/*
        This is not a complete example - the screen
        does not get updated by React because we
        have not updated any state or anything else
        that will cause a re-render
      */}
      {props.claps.find(({ id }) => id === user.id)?.claps}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // The name inside the square brackets of the filename
  // is inside of the `context.query` object
  const userId = convertQueryValue(context.query.userId);
  console.log('userId', userId);

  // console.log('cookies', context.req.cookies);

  const { getUserById } = await import('../../util/database');

  const user = await getUserById(userId);

  return {
    props: {
      user: user || null,
      // Passing cookie values as props
      following: parseCookieValue(context.req.cookies.following, []),
      claps: parseCookieValue(context.req.cookies.claps, []),
    },
  };
}
