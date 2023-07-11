import { PrismaClient } from '@prisma/client';
import { slugify } from '../lib/utils';

const prisma = new PrismaClient();

async function clean() {
  await prisma.user.deleteMany({}).then(() => {
    console.log('All users deleted.');
  });

  await prisma.course.deleteMany({}).then(() => {
    console.log('All users deleted.');
  });
}

async function seedCourses() {
  const courses = [];
  try {
    const course1 = await prisma.course.create({
      data: {
        name: 'Introduction to Docker',
        code: 301,
        description: 'Learn the basics of Docker',
        slug: slugify('Introduction to Docker'),
      },
    });

    const course2 = await prisma.course.create({
      data: {
        name: 'Introduction to Kubernetes',
        code: 302,
        description: 'Learn the basics of Kubernetes',
        slug: slugify('Introduction to Kubernetes'),
      },
    });

    courses.push(course1, course2);
    return courses;
  } catch (err) {
    console.error(err);
  }
  return courses;
}

// Need to import course type from prisma/client?
async function seedUsers(courses: any[]) {
  try {
    const teacher1 = await prisma.user.create({
      data: {
        name: 'Beth Halloway',
        email: 'bhallow@email.com',
        role: 'TEACHER',
        courses: {
          connect: {
            id: courses[0].id,
          },
        },
      },
    });

    const teacher2 = await prisma.user.create({
      data: {
        name: 'Rodriguez Martinez',
        email: 'rmart@email.com',
        role: 'TEACHER',
        courses: {
          connect: {
            id: courses[1].id,
          },
        },
      },
    });

    const student2 = await prisma.user.create({
      data: {
        name: 'Will Pratford',
        email: 'wprat@email.com',
        role: 'STUDENT',
        courses: {
          connect: {
            id: courses[0].id,
          },
        },
      },
    });
    const student3 = await prisma.user.create({
      data: {
        name: 'Xiao Lin Su',
        email: 'xlinsu@email.com',
        role: 'STUDENT',
        courses: {
          connect: {
            id: courses[0].id,
          },
        },
      },
    });
    const student4 = await prisma.user.create({
      data: {
        name: 'Prashant Singh',
        email: 'psingh@email.com',
        role: 'STUDENT',
        courses: {
          connect: {
            id: courses[1].id,
          },
        },
      },
    });
    const student5 = await prisma.user.create({
      data: {
        name: 'Francois Lemaire',
        email: 'flemai@email.com',
        role: 'STUDENT',
        courses: {
          connect: {
            id: courses[1].id,
          },
        },
      },
    });
    return [teacher1, teacher2, student2, student3, student4, student5];
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function seed() {
  try {
    console.log('Seeding...');
    const courses = await seedCourses();
    console.log('Courses: ', courses);
    console.log('Seeding users...');
    await seedUsers(courses);
  } catch (err) {
    console.error(err);
  }
}
async function main() {
  try {
    await clean();
    await seed();
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
main();
