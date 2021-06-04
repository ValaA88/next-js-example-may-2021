import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Read the PostgreSQL secret connection information
// (host, database, username, password) from the .env file
dotenvSafe.config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Perform a first query
export async function getUsers() {
  const users = await sql`SELECT * FROM users`;
  return users.map((user) => camelcaseKeys(user));
}

export async function getUserById(id) {
  // Return undefined if userId is not parseable
  // to an integer
  if (isNaN(parseInt(id))) return undefined;

  const users = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserByIdWithCourses(userId) {
  // Return undefined if userId is not parseable
  // to an integer
  if (isNaN(parseInt(userId))) return undefined;

  const userCourses = await sql`
    SELECT
      users.id as user_id,
      users.first_name as user_first_name,
      users.last_name as user_last_name,
      courses.id as course_id,
      courses.title as course_title,
      courses.slug as course_slug
    FROM
      users,
      courses,
      users_courses
    WHERE
      users.id = ${userId} AND
      users.id = users_courses.user_id AND
      users_courses.course_id = courses.id
  `;
  return userCourses.map((user) => camelcaseKeys(user));
}

export async function insertUser(firstName, lastName) {
  const users = await sql`
    INSERT INTO users
      (first_name, last_name)
    VALUES
      (${firstName}, ${lastName})
    RETURNING *
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function updateUserById(userId, firstName, lastName) {
  const users = await sql`
    UPDATE
      users
    SET
      first_name = ${firstName},
      last_name = ${lastName}
    WHERE
      id = ${userId}
    RETURNING *
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function deleteUserById(id) {
  if (isNaN(parseInt(id))) return undefined;

  const users = await sql`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING *
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}
