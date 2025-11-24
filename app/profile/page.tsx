import { ModeToggle } from '@/components/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CircleCheck } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Signout from '../signout';
import Password from './password';
import RepayLoan from './repayLoan';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.emailVerified) {
    redirect(`/verify?email=${session?.user.email}`);
  }

  const loans = await prisma.loan.findMany({
    where: { userId: session?.user.id },
    include: { book: true },
  });

  return (
    <main className="flex size-full items-center justify-center">
      <section className="flex flex-col">
        <Avatar>
          <AvatarImage src={session?.user.image ?? undefined} />
          <AvatarFallback>{session?.user.name[0]}</AvatarFallback>
        </Avatar>
        <p>Profile : {session?.user.name}</p>
        <div className="flex gap-2">
          <p>email : {session?.user.email}</p>
          {session.user.emailVerified && <CircleCheck />}
        </div>
        <Password />
        <ModeToggle />
        <Signout />
        <div>
          <h2>Loans:</h2>
          <div className="flex space-x-2">
            {loans.map((loan) => (
              <Card key={loan.id}>
                <CardHeader>
                  <CardTitle>{loan.book.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    Date d'emprunt:
                    {new Date(loan.loanDate).toLocaleDateString()}
                  </p>
                  <RepayLoan loan={loan} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
