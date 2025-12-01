'use client';

import Spinner from '@/components/skeleton/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Prisma } from '@/generated/prisma';
import { Dispatch, SetStateAction, useState } from 'react';

export default function SearchLoan({
  setLoans,
}: {
  setLoans: Dispatch<
    SetStateAction<
      Prisma.LoanGetPayload<{
        include: { book: true; user: true };
      }>[]
    >
  >;
}) {
  const [userEmail, setUserEmail] = useState('');
  const [bookName, setbookName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const findLoan = async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      userEmail,
      bookName,
    });

    const res = await fetch(`/api/loans?${params.toString()}`, {
      method: 'GET',
    });
    setIsLoading(false);

    if (!res.ok) {
      throw new Error('Erreur lors du fetch des emprunts');
    }
    const data = await res.json();
    setLoans(data);
  };

  return (
    <Card className="max-w-9/12">
      <CardHeader>
        <CardTitle>
          Rechercher un emprunt par livre ou par utilisateur
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Utilisateur :</Label>
        <Input
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Label>Livre :</Label>
        <Input value={bookName} onChange={(e) => setbookName(e.target.value)} />

        <Button onClick={() => findLoan()}>
          Rechercher {isLoading && <Spinner />}
        </Button>
      </CardContent>
    </Card>
  );
}
