import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Prisma } from '@/generated/prisma';

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
    include: { author: true };
  }>[];
}) {
  if (!displayResults) return null;
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Résultats ({searchResults.length})
      </h2>

      {searchResults.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((book) => (
            <Card
              key={book.id}
              className="cursor-pointer transition-shadow hover:shadow-lg"
              onClick={() => console.log('book', book)}
            >
              <CardHeader>
                <CardTitle className="line-clamp-2 text-base">
                  {book.name}
                </CardTitle>
                <CardDescription>{book.author.name}</CardDescription>
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
                    {/* <span
                          className={`font-medium ${book.isAvailable ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {book.isAvailable ? 'Disponible' : 'Emprunté'}
                        </span> */}
                  </div>
                </div>
              </CardContent>
            </Card>
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
