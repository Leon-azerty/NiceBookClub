import { BookSearch } from '@/components/book-search';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Home() {
  const books = await prisma.book.findMany({
    include: { author: true, loans: true },
  });

  return (
    <main>
      <Link href={'/profile'}>Voir mon profil</Link>
      <BookSearch books={books} />
    </main>
  );
}
