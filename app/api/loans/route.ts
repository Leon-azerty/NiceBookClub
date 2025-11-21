import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const loans = await prisma.loan.findMany();
    return Response.json(loans);
  } catch (error) {
    return Response.json({ error: 'error fetching loans' }, { status: 500 });
  }
}
