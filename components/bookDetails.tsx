import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Prisma } from '@/generated/prisma';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import Spinner from './skeleton/spinner';
import { Button } from './ui/button';

export default function BookDetails({
  book,
  setBooks,
}: {
  book: Prisma.BookGetPayload<{
    include: { author: true; loans: true };
  }>;
  setBooks: Dispatch<
    SetStateAction<
      Prisma.BookGetPayload<{
        include: { author: true; loans: true };
      }>[]
    >
  >;
}) {
  const [isButtonForLoanVisible, setIsButtonForLoanVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const deleteBook = async (bookId: string) => {
    setIsDeletingLoading(true);
    const res = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    });
    setIsDeletingLoading(false);
    if (!res.ok) {
      throw new Error('Erreur lors de la suppression du livre');
    }
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  const loanBook = async (bookId: string) => {
    setIsLoading(true);
    const session = await authClient.getSession();
    const res = await fetch(`/api/loans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        userId: session.data?.user.id,
      }),
    });
    setIsLoading(false);

    if (!res.ok) {
      throw new Error("Erreur lors de l'emprunt du livre");
    }
    const data = await res.json();
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === bookId ? { ...b, loans: [data] } : b))
    );

    setIsButtonForLoanVisible(false);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className="line-clamp-2 text-left text-base">
          {book.name}
        </DialogTitle>
        <DialogHeader>{book.author.name}</DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Genre:</span>
              <span className="font-medium">{book.genre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Année:</span>
              <span className="font-medium">{book.publishedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Editeur:</span>
              <span className="font-medium">{book.publisher}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Description:</span>
              <span className="font-medium">{book.description}</span>
            </div>
            <div className="flex justify-between">
              <Image
                src={book.imageLink || '/default-book-image.jpg'}
                alt={`Cover image of ${book.name}`}
                width={100}
                height={150}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Disponibilité:</span>
              <span
                className={`font-medium ${book.loans.length === 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {book.loans.length === 0 ? 'Disponible' : 'Emprunté'}
              </span>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex sm:justify-between">
        <Button
          variant={'destructive'}
          onClick={() => deleteBook(book.id)}
          disabled={isDeletingLoading}
        >
          Supprimer le livre
          {isDeletingLoading && <Spinner />}
        </Button>
        <Button
          onClick={() => {
            loanBook(book.id);
          }}
          disabled={
            book.loans.length > 0 || !isButtonForLoanVisible || isLoading
          }
        >
          {isLoading && <Spinner />}
          Emprunter ce livre
        </Button>
      </DialogFooter>
    </>
  );
}
