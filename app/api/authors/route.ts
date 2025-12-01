import { authorSchema } from '@/app/common/schema';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const authors = await prisma.author.findMany();
    return Response.json(authors);
  } catch (error) {
    console.error('Error fetching authors', error);
    return Response.json({ error: 'error fetching authors' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  try {
    const parsedBody = authorSchema.parse(body);
    const newAuthor = await prisma.author.create({
      data: {
        name: parsedBody.name,
      },
    });
    return Response.json(newAuthor, { status: 201 });
  } catch (error) {
    console.error('Error creating authors', error);
    return Response.json({ error: 'error creating author' }, { status: 500 });
  }
}
