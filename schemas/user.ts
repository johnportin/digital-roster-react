import * as z from 'zod';

const userSchema = z.object({
  userName: z.string().min(2).max(50),
  userEmail: z.string().email(),
  userRole: z.enum(['STUDENT', 'TEACHER', 'ADMIN']),
  userCourse: z.string().min(2).max(100),
});

export default userSchema;
