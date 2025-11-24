import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Prisma } from '@/generated/prisma';
import { Search } from 'lucide-react';
import { useMemo } from 'react';

export default function SearchContainer({
  books,
  bookTitle,
  author,
  genre,
  setBookTitle,
  setAuthor,
  setGenre,
  setAvailableOnly,
  setSearchResults,
  setDisplayResults,
}: {
  books: Prisma.BookGetPayload<{
    include: { author: true; loans: true };
  }>[];
  bookTitle: string;
  author: string;
  genre: string;
  setBookTitle: React.Dispatch<React.SetStateAction<string>>;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<
    React.SetStateAction<
      Prisma.BookGetPayload<{
        include: { author: true; loans: true };
      }>[]
    >
  >;
  setDisplayResults: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Extraire les genres uniques
  const genres = useMemo(() => {
    return Array.from(new Set(books.map((book) => book.genre))).sort();
  }, []);

  const handleSearch = () => {
    const results = books.filter((book) => {
      const matchesTitle = book.name
        .toLowerCase()
        .includes(bookTitle.toLowerCase());
      const matchesAuthor = book.author.name
        .toLowerCase()
        .includes(author.toLowerCase());
      const matchesGenre = genre === '' || book.genre === genre;
      const matchesAvailability = true; // !availableOnly || book.isAvailable;

      return (
        matchesTitle && matchesAuthor && matchesGenre && matchesAvailability
      );
    });
    setSearchResults(results);
    setDisplayResults(true);
  };

  const handleReset = () => {
    setBookTitle('');
    setAuthor('');
    setGenre('');
    setSearchResults(books);
    setDisplayResults(true);
  };
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Filtres de recherche
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Recherche par titre */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Titre du livre
            </label>
            <Input
              placeholder="Ex: Le Seigneur des Anneaux"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Recherche par auteur */}
          <div>
            <label className="mb-2 block text-sm font-medium">Auteur</label>
            <Input
              placeholder="Ex: Tolkien"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Recherche par genre */}
          <div>
            <label className="mb-2 block text-sm font-medium">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="border-input bg-background text-foreground w-full rounded-md border px-3 py-2"
            >
              <option value="">Tous les genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="available-only"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="border-input h-4 w-4 rounded"
          />
          <label
            htmlFor="available-only"
            className="cursor-pointer text-sm font-medium"
          >
            Disponible à l'emprunt uniquement
          </label>
        </div> */}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
          <Button onClick={handleSearch}>Rechercher</Button>
        </div>
      </CardContent>
    </Card>
  );
}
