'use server';
import * as z from 'zod';
import { prisma } from '@/prisma/db';

// Importing dependencies
const formSchema = z.object({
  userName: z.string().min(2).max(50),
  userEmail: z.string().email(),
});

export async function addUser(values: z.infer<typeof formSchema>) {
  console.log('Running addUser actions...');
  const { userName, userEmail } = formSchema.parse(values);
  console.log('userName: ', userName);
  console.log('userEmail: ', userEmail);
  const user = await prisma.user.create({
    data: {
      name: userName,
      email: userEmail,
    },
  });
  console.log('user: ', user);
  console.log('addUser actions finished.');
}
