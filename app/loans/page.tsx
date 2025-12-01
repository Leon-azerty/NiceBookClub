import { prisma } from '@/lib/prisma';
import LoansContainer from './loansContainer';

export default async function Page() {
  const loans = await prisma.loan.findMany({
    include: { book: true, user: true },
  });

  return (
    <section className="flex flex-col justify-center">
      <h2 className="text-xl">Emprunts : </h2>
      <LoansContainer initialLoans={loans} />
    </section>
  );
}
