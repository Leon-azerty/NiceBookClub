export const dynamic = 'force-dynamic';

import { BookSearch } from '@/components/book-search';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const initialBooks = await prisma.book.findMany({
    include: { author: true, loans: true },
  });

  return (
    <main>
      <BookSearch initialBooks={initialBooks} />
    </main>
  );
}
