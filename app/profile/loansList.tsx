'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Prisma } from '@/generated/prisma';
import { useState } from 'react';
import RepayLoan from './repayLoan';

export default function LoansList({
  initialLoans,
}: {
  initialLoans: Prisma.LoanGetPayload<{ include: { book: true } }>[];
}) {
  const [loans, setLoans] = useState(initialLoans);
  return (
    <>
      {loans.map((loan) => (
        <Card key={loan.id}>
          <CardHeader>
            <CardTitle>{loan.book.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              Date d&apos;emprunt:
              {new Date(loan.loanDate).toLocaleDateString()}
            </p>
            <RepayLoan
              loan={loan}
              onRepaying={() => {
                console.log('BEFORE Loans', loans);
                const newLoans = loans.filter((item) => item !== loan);
                setLoans(newLoans);
                console.log('AFTER Loans', loans);
              }}
            />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
