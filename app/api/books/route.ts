import { bookSchema } from '@/app/common/schema';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const books = await prisma.book.findMany();
    return Response.json(books);
  } catch (error) {
    return Response.json({ error: 'error fetching books' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const parsedBody = bookSchema.parse(body);
    if (parsedBody.authorId) {
      const newBook = await prisma.book.create({
        data: {
          name: parsedBody.name,
          genre: parsedBody.genre,
          authorId: parsedBody.authorId,
        },
      });
      return Response.json(newBook, { status: 201 });
    } else if (parsedBody.authorName) {
      const newBook = await prisma.book.create({
        data: {
          name: parsedBody.name,
          genre: parsedBody.genre,
          author: {
            create: {
              name: parsedBody.authorName,
            },
          },
        },
      });
      return Response.json(newBook, { status: 201 });
    } else {
      return Response.json(
        { error: 'Either authorId or authorName must be provided' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating book:', error);
    return Response.json({ error: 'error' }, { status: 500 });
  }
}
