import { Card, CardContent } from '@/components/ui/card';
import { Prisma } from '@/generated/prisma';
import { useState } from 'react';
import BookList from './book-list';

export default function BookResult({
  initialBooks,
}: {
  initialBooks: Prisma.BookGetPayload<{
    include: { author: true; loans: true };
  }>[];
}) {
  const [books, setBooks] = useState(initialBooks);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Résultats ({books.length})</h2>

      {books.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <BookList books={books} setBooks={setBooks} />
        </div>
      ) : (
        <Card>
          <CardContent className="text-muted-foreground pt-6 text-center">
            <p>Aucun livre ne correspond à votre recherche.</p>
            <p className="mt-2 text-sm">Essayez d&apos;ajuster vos filtres.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
