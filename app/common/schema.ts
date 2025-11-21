import z from 'zod';

export const bookSchema = z.object({
  name: z.string(),
  genre: z.string(),
  authorId: z.string().optional(),
  authorName: z.string().optional(),
});

export const authorSchema = z.object({
  name: z.string(),
});

export const loanSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  loanDate: z.date(),
});
