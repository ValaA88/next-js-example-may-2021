import Head from 'next/head';
import Layout from '../../../components/Layout';
import { convertQueryValue } from '../../../util/context';

export default function SingleUserWithCourses(props) {
  return (
    <Layout>
      <Head>
        <title>User with Courses</title>
      </Head>

      {props.userCourses.map((userCourse) => (
        <div
          key={`userCourse-${userCourse.userId}-${userCourse.courseId}`}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
          }}
        >
          <div>user id: {userCourse.userId}</div>
          <div>user first name: {userCourse.userFirstName}</div>
          <div>user last name: {userCourse.userLastName}</div>
          <div>course id: {userCourse.courseId}</div>
          <div>course title: {userCourse.courseTitle}</div>
          <div>course slug: {userCourse.courseSlug}</div>
        </div>
      ))}
      <br />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // The name inside the square brackets of the filename
  // is inside of the `context.query` object
  const userId = convertQueryValue(context.query.userId);
  console.log('userId', userId);

  // console.log('cookies', context.req.cookies);

  const { getUserByIdWithCourses } = await import('../../../util/database');

  const userCourses = await getUserByIdWithCourses(userId);

  return {
    props: {
      userCourses: userCourses,
    },
  };
}
