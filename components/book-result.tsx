import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Prisma } from '@/generated/prisma';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { useState } from 'react';
import Spinner from './skeleton/spinner';
import { Button } from './ui/button';

export default function BookResult({
  initialBooks,
}: {
  initialBooks: Prisma.BookGetPayload<{
    include: { author: true; loans: true };
  }>[];
}) {
  const [isButtonForLoanVisible, setIsButtonForLoanVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState(initialBooks);

  const deleteBook = async (bookId: string) => {
    const res = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Erreur lors de la suppression du livre');
    }
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

    if (!res.ok) {
      setIsLoading(false);
      throw new Error("Erreur lors de l'emprunt du livre");
    }
    const data = await res.json();
    console.log('Loan created:', data);
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === bookId ? { ...b, loans: [data] } : b))
    );

    setIsButtonForLoanVisible(false);
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Résultats ({books.length})</h2>

      {books.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Dialog key={book.id}>
              <DialogTrigger
                className="cursor-pointer transition-shadow hover:shadow-lg"
                onClick={() => console.log('book', book)}
              >
                <Card>
                  <CardHeader className="items-start text-left">
                    <CardTitle className="line-clamp-2 text-left text-base">
                      {book.name}
                    </CardTitle>
                    <CardDescription className="text-left">
                      {book.author.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Genre:</span>
                        <span className="font-medium">{book.genre}</span>
                      </div>
                      {/* <div className="flex justify-between">
                        <span className="text-muted-foreground">Année:</span>
                        <span className="font-medium">{book.year}</span>
                      </div> */}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Disponibilité:
                        </span>
                        <span
                          className={`font-medium ${book.loans.length === 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {book.loans.length === 0 ? 'Disponible' : 'Emprunté'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
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
                        <span className="font-medium">
                          {book.publishedDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Editeur:</span>
                        <span className="font-medium">{book.publisher}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Description:
                        </span>
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
                        <span className="text-muted-foreground">
                          Disponibilité:
                        </span>
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
                  >
                    Supprimer le livre
                  </Button>
                  <Button
                    onClick={() => {
                      loanBook(book.id);
                    }}
                    disabled={book.loans.length > 0 || !isButtonForLoanVisible}
                  >
                    {isLoading && <Spinner />}
                    Emprunter ce livre
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
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
