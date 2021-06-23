const users = [
  {
    first_name: 'Karl',
    last_name: 'Horky',
    username: 'karlhorky',
    password_hash: '23j8f9u98sajij398u9asijgio34jo4',
  },
  {
    first_name: 'Janos',
    last_name: 'Spanyol',
    username: 'janosspanyol',
    password_hash: '23j8f9u98sajij398u9asijgio34jo4',
  },
  {
    first_name: 'Nicolas',
    last_name: 'Gadner',
    username: 'nicolasgadner1',
    password_hash: '23j8f9u98sajij398u9asijgio34jo4',
  },
  {
    first_name: 'Nicolas',
    last_name: 'Gadner',
    username: 'nicolasgadner2',
    password_hash: '23j8f9u98sajij398u9asijgio34jo4',
  },
  {
    first_name: 'Nicolas',
    last_name: 'Gadner',
    username: 'nicolasgadner3',
    password_hash: '23j8f9u98sajij398u9asijgio34jo4',
  },
  {
    first_name: 'Nicolas',
    last_name: 'Gadner',
    username: 'nicolasgadner4',
    password_hash: '23j8f9u98sajij398u9asijgio34jo4',
  },
  {
    first_name: 'Nicolas',
    last_name: 'Gadner',
    username: 'nicolasgadner5',
    password_hash: '23j8f9u98sajij398u9asijgio34jo4',
  },
];

exports.users = users;

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
