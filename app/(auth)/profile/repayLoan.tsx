'use client';

import Spinner from '@/components/skeleton/spinner';
import { Button } from '@/components/ui/button';
import { Loan } from '@/generated/prisma';
import { useState } from 'react';

export default function RepayLoan({
  loan,
  onRepaying,
}: {
  loan: Loan;
  onRepaying: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const repayLoan = async (loan: Loan) => {
    setIsLoading(true);
    const res = await fetch(`/api/loans/${loan.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      setIsLoading(false);
      throw new Error('Erreur lors du rendu du livre');
    }
    setIsLoading(false);
    onRepaying();
  };

  return (
    <Button
      onClick={() => {
        repayLoan(loan);
      }}
      variant={'secondary'}
    >
      Rendre ce livre
      {isLoading && <Spinner />}
    </Button>
  );
}
