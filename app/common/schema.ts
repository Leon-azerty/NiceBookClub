import z from 'zod';

export const bookSchema = z.object({
  name: z.string().min(1, 'Le nom du livre est requis'),
  genre: z.string().min(1, 'Le genre du livre est requis'),
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
