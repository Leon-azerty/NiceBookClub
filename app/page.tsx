import { BookSearch } from '@/components/book-search';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const books = await prisma.book.findMany({ include: { author: true } });
  console.log('books', books);
  return (
    <main>
      <p>Welcome to NiceBookClub!</p>
      <BookSearch books={books} />
    </main>
  );
}
