import { bookSchema } from '@/app/common/schema';
import { prisma } from '@/lib/prisma';
import { waitUntil } from '@vercel/functions';

export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return Response.json(books);
  } catch (error) {
    console.error('Error fetching books', error);
    return Response.json({ error: 'error fetching books' }, { status: 500 });
  }
}

const getAdditionalBookData = async (bookName: string, id: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookName)}`;
  const res = await fetch(url);
  const data = await res.json();
  const book = prisma.book.update({
    where: { id: id },
    data: {
      description: data.items[0]?.volumeInfo?.description || null,
      publisher: data.items[0]?.volumeInfo?.publisher || null,
      publishedDate: data.items[0]?.volumeInfo?.publishedDate || null,
      imageLink: data.items[0]?.volumeInfo?.imageLinks?.thumbnail || null,
    },
  });
  return book;
};

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
      waitUntil(getAdditionalBookData(newBook.name, newBook.id));
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
