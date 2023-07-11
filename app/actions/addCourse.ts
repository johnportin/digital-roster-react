'use server';
import * as z from 'zod';
import { prisma } from '@/prisma/db';
import courseSchema from '@/schemas/course';
import { slugify } from '@/lib/utils';

export async function addCourse(values: z.infer<typeof courseSchema>) {
  try {
    console.log('Running addcourse action...');

    const { courseName, courseCode, courseDescription } =
      courseSchema.parse(values);
    const courseSlug = slugify(courseName);

    console.log('courseName: ', courseName);
    console.log('courseCode: ', courseCode);
    console.log('courseDescription: ', courseDescription);
    console.log('courseSlug: ', courseSlug);

    const course = await prisma.course.create({
      data: {
        name: courseName,
        code: courseCode,
        description: courseDescription,
        slug: courseSlug,
      },
    });
    console.log('course: ', course);
    console.log('addCourse action finished.');
  } catch (err) {
    console.error(err);
  }
}
