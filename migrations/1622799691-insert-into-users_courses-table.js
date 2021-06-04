const usersCourses = [
  { user_id: 6, course_id: 2 },
  { user_id: 6, course_id: 1 },
  { user_id: 7, course_id: 1 },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO users_courses ${sql(usersCourses, 'user_id', 'course_id')}
  `;
};

exports.down = async function down(sql) {
  for (const userCourse of usersCourses) {
    await sql`
      DELETE FROM
        users_courses
      WHERE
        user_id = ${userCourse.user_id} AND
        course_id = ${userCourse.course_id}
    `;
  }
};
