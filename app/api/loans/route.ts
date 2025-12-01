import { loanSchema } from '@/app/common/schema';
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
    const loans = await prisma.loan.findMany();
    return Response.json(loans);
  } catch (error) {
    console.error('Error fetching loans', error);
    return Response.json({ error: 'error fetching loans' }, { status: 500 });
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
    const parsedBody = loanSchema.parse(body);
    const newLoan = await prisma.loan.create({
      data: {
        userId: parsedBody.userId,
        bookId: parsedBody.bookId,
        loanDate: new Date(Date.now()),
      },
    });
    console.log('New loan created:', newLoan);
    return Response.json(newLoan, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return Response.json({ error: 'error' }, { status: 500 });
  }
}
