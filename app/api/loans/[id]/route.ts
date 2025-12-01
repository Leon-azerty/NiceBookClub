// app/api/loans/[id]/route.ts

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(
  _req: Request,
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
    const deletedLoan = await prisma.loan.delete({
      where: { id },
    });
    console.log('Delete Loan ', deletedLoan);
    return NextResponse.json(deletedLoan);
  } catch (error) {
    console.error('Error deleting book:', error);
    return Response.json({ error: 'error' }, { status: 500 });
  }
}
