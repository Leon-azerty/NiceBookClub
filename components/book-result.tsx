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
import { Button } from './ui/button';

export default function BookResult({
  bookTitle,
  author,
  genre,
  availableOnly,
  displayResults,
  searchResults,
}: {
  bookTitle: string;
  author: string;
  genre: string;
  availableOnly: boolean;
  displayResults: boolean;
  searchResults: Prisma.BookGetPayload<{
    include: { author: true; loans: true };
  }>[];
}) {
  if (!displayResults) return null;

  const deleteBook = async (bookId: string) => {
    const res = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error('Erreur lors de la suppression du livre');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Résultats ({searchResults.length})
      </h2>

      {searchResults.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((book) => (
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
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex sm:justify-between">
                  <Button
                    variant={'destructive'}
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete this book
                  </Button>
                  <Button>Loan this book</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-muted-foreground pt-6 text-center">
            <p>Aucun livre ne correspond à votre recherche.</p>
            <p className="mt-2 text-sm">Essayez d'ajuster vos filtres.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
