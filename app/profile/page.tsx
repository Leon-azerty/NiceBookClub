import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import Link from 'next/link';
import Signout from '../signout';
import LoansList from './loansList';
import Password from './password';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const loans = await prisma.loan.findMany({
    where: { userId: session?.user.id },
    include: { book: true },
  });

  return (
    <main className="flex size-full items-center justify-center">
      <section className="flex flex-col">
        <Link href="/">Voir les livres</Link>
        <Avatar>
          <AvatarImage src={session?.user.image ?? undefined} />
          <AvatarFallback>{session?.user.name[0]}</AvatarFallback>
        </Avatar>
        <p>Profile : {session?.user.name}</p>
        <div className="flex gap-2">
          <p>email : {session?.user.email}</p>
        </div>
        <Password />
        <ModeToggle />
        <Signout />
        <div className="max-w-9/12">
          <h2>Loans:</h2>
          <div className="flex flex-wrap space-x-2">
            <LoansList initialLoans={loans} />
          </div>
        </div>
      </section>
    </main>
  );
}
