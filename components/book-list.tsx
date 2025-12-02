import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Prisma } from '@/generated/prisma';
import { Dispatch, SetStateAction } from 'react';
import BookDetails from './bookDetails';

export default function BookList({
  books,
  setBooks,
}: {
  books: Prisma.BookGetPayload<{
    include: { author: true; loans: true };
  }>[];
  setBooks: Dispatch<
    SetStateAction<
      Prisma.BookGetPayload<{
        include: { author: true; loans: true };
      }>[]
    >
  >;
}) {
  console.log('books', books);
  return (
    <>
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
            <BookDetails book={book} setBooks={setBooks} />
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
