'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Prisma } from '@/generated/prisma';

export default function LoansList({
  loans,
}: {
  loans: Prisma.LoanGetPayload<{
    include: { book: true; user: true };
  }>[];
}) {
  return (
    <div className="flex items-center">
      {loans.map((loan) => (
        <Card key={loan.id} className="">
          <CardHeader>
            <CardTitle>{loan.book.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              Date d&apos;emprunt:
              {new Date(loan.loanDate).toLocaleDateString()}
            </p>
            <p>User : {loan.user.email}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
