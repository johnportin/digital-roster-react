'use server';
import * as z from 'zod';
import { prisma } from '@/prisma/db';
import userSchema from '@/schemas/user';

export async function addUser(values: z.infer<typeof userSchema>) {
  console.log('Running addUser actions...');
  try {
    const { userName, userEmail, userRole, userCourse } =
      userSchema.parse(values);
    console.log('userName: ', userName);
    console.log('userEmail: ', userEmail);
    console.log('userRole: ', userRole);
    console.log('userCourse: ', userCourse);
    const user = await prisma.user.create({
      data: {
        name: userName,
        email: userEmail,
      },
    });
    console.log('user: ', user);
    console.log('addUser actions finished.');
  } catch (err) {
    console.error(err);
  }
}
