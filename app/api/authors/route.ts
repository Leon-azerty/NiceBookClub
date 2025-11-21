import { authorSchema } from '@/app/common/schema';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const authors = await prisma.author.findMany();
    return Response.json(authors);
  } catch (error) {
    return Response.json({ error: 'error fetching authors' }, { status: 500 });
  }
}

export async function POST(req: Request) {
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
    return Response.json({ error: 'error creating author' }, { status: 500 });
  }
}
