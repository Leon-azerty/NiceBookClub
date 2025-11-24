import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function AddAuthor() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la création de l'auteur");
      }
      setSuccess(true);
      setName('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex max-w-md flex-col gap-2">
      <label htmlFor="author-name" className="font-medium">
        Ajouter un auteur
      </label>
      <div className="flex gap-2">
        <Input
          id="author-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de l'auteur"
          className="input input-bordered focus:ring-primary flex-1 rounded border px-3 py-2 focus:ring-2 focus:outline-none"
          required
        />
        <Button
          type="submit"
          className="hover:bg-primary/90 rounded px-4 py-2 disabled:opacity-50"
          disabled={loading || !name.trim()}
        >
          {loading ? 'Ajout...' : 'Ajouter'}
        </Button>
      </div>
      {success && (
        <span className="text-sm text-green-600">Auteur ajouté !</span>
      )}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </form>
  );
}
