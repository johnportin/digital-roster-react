'use server';
import * as z from 'zod';

// Importing dependencies
const formSchema = z.object({
  userName: z.string().min(2).max(50),
  userEmail: z.string().email(),
});

export async function addUser(values: z.infer<typeof formSchema>) {
  console.log('Running addUser actions...');
  console.log('addUser actions finished.');
}
