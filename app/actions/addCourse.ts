'use server';
import * as z from 'zod';
import { prisma } from '@/prisma/db';
import courseSchema from '@/schemas/course';

export async function addCourse(values: z.infer<typeof courseSchema>) {
  try {
    console.log('Running addcourse action...');
    const { courseName, courseCode, courseDescription } =
      courseSchema.parse(values);
    console.log('courseName: ', courseName);
    console.log('courseCode: ', courseCode);
    console.log('courseDescription: ', courseDescription);

    const course = await prisma.course.create({
      data: {
        name: courseName,
        code: courseCode,
        description: courseDescription,
      },
    });
    console.log('course: ', course);
    console.log('addCourse action finished.');
  } catch (err) {
    console.error(err);
  }
}
