import z from 'zod';

export const bookSchema = z.object({
  name: z.string(),
  genre: z.string(),
  authorId: z.string().optional(),
  authorName: z.string().optional(),
});
