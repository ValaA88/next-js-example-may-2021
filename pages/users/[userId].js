import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  addClapByUserId,
  parseCookieValue,
  toggleFollowingUserByUserId,
} from '../../util/cookies';

export default function SingleUser(props) {
  console.log('props', props);
  const [following, setFollowing] = useState(props.following);

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
          setFollowing(toggleFollowingUserByUserId(props.user.id));
        }}
      >
        {following.includes(props.user.id) ? 'Unfollow' : 'Follow'}
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
          addClapByUserId(props.user.id);
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
      {props.claps.find((user) => user.id === props.user.id)?.claps}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // The name inside the square brackets of the filename
  // is inside of the `context.query` object
  const userId = context.query.userId;
  console.log('userId', userId);

  console.log('cookies', context.req.cookies);

  const { users } = await import('../../util/database');

  const user = users.find((u) => u.id === userId);

  return {
    props: {
      user: user,
      // Passing cookie values as props
      following: parseCookieValue(context.req.cookies.following, []),
      claps: parseCookieValue(context.req.cookies.claps, []),
    },
  };
}
