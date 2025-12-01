'use client';

import { Prisma } from '@/generated/prisma';
import { useState } from 'react';
import LoansList from './loansList';
import SearchLoan from './searchLoan';

export default function LoansContainer({
  initialLoans,
}: {
  initialLoans: Prisma.LoanGetPayload<{
    include: { book: true; user: true };
  }>[];
}) {
  const [loans, setLoans] = useState(initialLoans);
  return (
    <section>
      <SearchLoan setLoans={setLoans} />
      <LoansList loans={loans} />
    </section>
  );
}
