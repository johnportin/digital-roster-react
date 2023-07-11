import * as z from 'zod';

const courseSchema = z.object({
  courseName: z.string().min(2).max(50),
  courseCode: z.coerce.number().int().min(0).max(9999),
  courseDescription: z.string().min(2).max(2000),
});

export default courseSchema;
