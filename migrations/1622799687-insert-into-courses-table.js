const courses = [
  { title: 'Web Development Bootcamp', slug: 'bootcamp' },
  { title: 'Tech Fundamentals', slug: 'tech-fundamentals' },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO courses ${sql(courses, 'title', 'slug')}
  `;
};

exports.down = async function down(sql) {
  for (const course of courses) {
    await sql`
      DELETE FROM
        courses
      WHERE
        title = ${course.title} AND
        slug = ${course.slug}
    `;
  }
};
