// app/api/authors/[id]/route.ts

import { authorSchema } from '@/app/common/schema';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;

  const author = await prisma.author.findUnique({
    where: { id },
    include: { books: true },
  });
  if (author) {
    return NextResponse.json(author);
  } else {
    return NextResponse.json({ error: 'Author not found' }, { status: 404 });
  }
}

// Il faut aussi qu'on puisse modifier les livres de l'auteur ?
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await req.json();
    const parsedAuthor = authorSchema.parse(body);

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: {
        name: parsedAuthor.name,
      },
    });
    return NextResponse.json(updatedAuthor);
  } catch (error) {
    console.error('Error updating author:', error);
    return Response.json({ error: 'error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id },
    });
    return NextResponse.json(deletedAuthor);
  } catch (error) {
    console.error('Error deleting author:', error);
    return Response.json({ error: 'error' }, { status: 500 });
  }
}
