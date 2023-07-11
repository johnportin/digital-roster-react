import { PrismaClient } from '@prisma/client';
import { slugify } from '@/lib/utils';

const prisma = new PrismaClient();

async function clean() {
  await prisma.user.deleteMany({}).then(() => {
    console.log('All users deleted.');
  });

  prisma.course.deleteMany({}).then(() => {
    console.log('All users deleted.');
  });
}

clean()
  .then(() => {
    console.log('Cleaned.');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
