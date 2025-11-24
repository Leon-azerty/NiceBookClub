'use client';

import { Button } from '@/components/ui/button';
import { Loan } from '@/generated/prisma';

export default function RepayLoan({ loan }: { loan: Loan }) {
  const repayLoan = async (loan: Loan) => {
    const res = await fetch(`/api/loans/${loan.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Erreur lors du rendu du livre');
    }
  };

  return (
    <Button
      onClick={() => {
        repayLoan(loan);
      }}
      variant={'secondary'}
    >
      Rendre ce livre
    </Button>
  );
}
