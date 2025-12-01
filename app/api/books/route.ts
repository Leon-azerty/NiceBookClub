import { bookSchema } from '@/app/common/schema';
import { Prisma } from '@/generated/prisma';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { waitUntil } from '@vercel/functions';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const author = searchParams.get('author');
    const genre = searchParams.get('genre');
    // const available = searchParams.get('available')

    console.log('name', name);
    console.log('author', author);
    console.log('genre', genre);

    const where: Prisma.BookWhereInput = {};
    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }
    if (genre) {
      where.genre = { equals: genre, mode: 'insensitive' };
    }
    if (author) {
      where.author = { name: { contains: author, mode: 'insensitive' } };
    }
    // if (available === 'true') {
    //   // filtre les livres sans prêts actifs
    //   where.loans = { none: {} };
    // }

    const books = await prisma.book.findMany({
      where: where,
      include: {
        author: true,
        loans: true,
      },
    });
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
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
