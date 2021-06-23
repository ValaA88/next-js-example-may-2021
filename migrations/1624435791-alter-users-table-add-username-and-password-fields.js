exports.up = async (sql) => {
  await sql`
    ALTER TABLE users
    ADD COLUMN username varchar(40) UNIQUE NOT NULL,
    ADD COLUMN password_hash varchar(100) NOT NULL
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE users
    DROP COLUMN username,
    DROP COLUMN password_hash
  `;
};
