const { users } = require('./1622793931-insert-into-users-table');

exports.up = async function up(sql) {
  await sql`
    INSERT INTO users ${sql(
      users,
      'first_name',
      'last_name',
      'username',
      'password_hash',
    )}
  `;
};

exports.down = async function down(sql) {
  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        first_name = ${user.first_name} AND
        last_name = ${user.last_name}
    `;
  }
};
