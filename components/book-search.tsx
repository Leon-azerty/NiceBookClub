'use client';

import { Prisma } from '@/generated/prisma';
import { useState } from 'react';
import AddAuthor from './addAuthor';
import AddBook from './addBook';
import BookResult from './book-result';
import SearchContainer from './search-container';

export function BookSearch({
  books,
}: {
  books: Prisma.BookGetPayload<{
    include: { author: true; loans: true };
  }>[];
}) {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [displayResults, setDisplayResults] = useState(true);
  const [searchResults, setSearchResults] = useState<
    Prisma.BookGetPayload<{
      include: { author: true; loans: true };
    }>[]
  >(books);

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Recherche de Livres</h1>
        <p className="text-muted-foreground">
          Trouvez vos livres préférés en fonction du titre, de l&apos;auteur ou
          du genre
        </p>
      </div>
      <AddBook />
      <AddAuthor />

      <SearchContainer
        books={books}
        bookTitle={bookTitle}
        author={author}
        genre={genre}
        setBookTitle={setBookTitle}
        setAuthor={setAuthor}
        setGenre={setGenre}
        setSearchResults={setSearchResults}
        setDisplayResults={setDisplayResults}
      />
      <BookResult
        displayResults={displayResults}
        searchResults={searchResults}
      />
    </div>
  );
}
