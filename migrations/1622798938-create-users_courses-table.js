exports.up = async function up(sql) {
  await sql`
    CREATE TABLE users_courses (
      user_id integer REFERENCES users (id),
      course_id integer REFERENCES courses (id),
      PRIMARY KEY (user_id, course_id)
    )
  `;
};

exports.down = async function up(sql) {
  await sql`
    DROP TABLE users_courses
  `;
};
