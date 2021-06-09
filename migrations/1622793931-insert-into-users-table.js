const users = [
  { first_name: 'Karl', last_name: 'Horky' },
  { first_name: 'Janos', last_name: 'Spanyol' },
  { first_name: 'Nicolas', last_name: 'Gadner' },
  { first_name: 'Nicolas', last_name: 'Gadner' },
  { first_name: 'Nicolas', last_name: 'Gadner' },
  { first_name: 'Nicolas', last_name: 'Gadner' },
  { first_name: 'Nicolas', last_name: 'Gadner' },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO users ${sql(users, 'first_name', 'last_name')}
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
