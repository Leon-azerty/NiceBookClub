'use client';

import { Prisma } from '@/generated/prisma';
import { useState } from 'react';
import AddAuthor from './addAuthor';
import AddBook from './addBook';
import BookResult from './book-result';
import SearchContainer from './search-container';

export function BookSearch({
  initialBooks,
}: {
  initialBooks: Prisma.BookGetPayload<{
    include: { author: true; loans: true };
  }>[];
}) {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [books, setBooks] = useState<
    Prisma.BookGetPayload<{
      include: { author: true; loans: true };
    }>[]
  >(initialBooks);

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Recherche de Livres</h1>
        <p className="text-muted-foreground">
          Trouvez vos livres préférés en fonction du titre, de l&apos;auteur ou
          du genre
        </p>
      </div>
      <AddBook setBooks={setBooks} />
      <AddAuthor />

      <SearchContainer
        books={books}
        bookTitle={bookTitle}
        author={author}
        genre={genre}
        setBookTitle={setBookTitle}
        setAuthor={setAuthor}
        setGenre={setGenre}
        setBooks={setBooks}
      />
      <BookResult books={books} setBooks={setBooks} />
    </div>
  );
}
