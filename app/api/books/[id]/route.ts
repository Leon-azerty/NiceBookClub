// app/api/books/[id]/route.ts

import { bookSchema } from '@/app/common/schema';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const book = await prisma.book.findUnique({
    where: { id },
    include: { author: true },
  });
  if (book) {
    return NextResponse.json(book);
  } else {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const parsedBook = bookSchema.parse(body);

    if (!parsedBook.authorId && !parsedBook.authorName) {
      return Response.json(
        { error: 'authorId or authorName is required to update the book' },
        { status: 400 }
      );
    }

    let authorId = parsedBook.authorId;
    // If no authorId, create a new author
    if (!authorId && parsedBook.authorName) {
      const newAuthor = await prisma.author.create({
        data: { name: parsedBook.authorName },
      });
      authorId = newAuthor.id;
    }
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        name: parsedBook.name,
        genre: parsedBook.genre,
        authorId,
      },
    });
    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    return Response.json({ error: 'error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
    });
    return NextResponse.json(deletedBook);
  } catch (error) {
    console.error('Error deleting book:', error);
    return Response.json({ error: 'error' }, { status: 500 });
  }
}
