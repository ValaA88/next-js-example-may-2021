import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Read the PostgreSQL secret connection information
// (host, database, username, password) from the .env file
dotenvSafe.config();

// Connect to the database
const sql = postgres();

// Perform a first query
export async function getUsers() {
  const users = await sql`SELECT * FROM users`;
  return users.map((user) => camelcaseKeys(user));
}

export async function getUserById(id) {
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
