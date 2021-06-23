const {users} = require('./1622793931-insert-into-users-table')

exports.up = async function up(sql) {
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

exports.down = async function down(sql) {
  await sql`
    INSERT INTO users ${sql(users, 'first_name', 'last_name')}
  `;
};
