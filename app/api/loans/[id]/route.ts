// app/api/loans/[id]/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log('DELETE ICI');
  const { id } = await params;
  console.log('id = ', id);
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
