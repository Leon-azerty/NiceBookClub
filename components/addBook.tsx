'use client';

import { useForm } from '@tanstack/react-form';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import Spinner from './skeleton/spinner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function AddBook() {
  const [showForm, setShowForm] = useState(false);
  const form = useForm({
    defaultValues: {
      name: '',
      genre: '',
      authorName: '',
    },

    onSubmit: async ({ value }) => {
      console.log('Submitted', value);
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      const data = await res.json();
      if (data.error) {
        console.error('Failed to add book : ', data.error);
      } else {
        console.log('Book added successfully');
        setShowForm(false);
      }
    },
  });

  return (
    <div className="py-4">
      {showForm ? (
        <>
          <Button
            size={'icon'}
            variant={'outline'}
            onClick={() => setShowForm(false)}
          >
            <CircleX />
          </Button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* name */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Champ obligatoire' : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1">
                  <Label>Name</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors &&
                    field.state.meta.errors.map((error, i) => (
                      <p key={i} className="text-sm text-red-500">
                        {error}
                      </p>
                    ))}
                </div>
              )}
            </form.Field>

            {/* genre */}
            <form.Field
              name="genre"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Champ obligatoire' : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1">
                  <Label>Genre</Label>
                  <Input
                    type="genre"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* authorName */}
            <form.Field
              name="authorName"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Champ obligatoire' : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1">
                  <Label>Auteur</Label>
                  <Input
                    type="authorName"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <Button type="submit" disabled={form.state.isSubmitting}>
              {form.state.isSubmitting ? 'Ajout...' : 'Ajouter le livre'}
            </Button>
          </form>
        </>
      ) : (
        <Button
          onClick={() => setShowForm(true)}
          disabled={!form.state.isValid || form.state.isSubmitting}
        >
          {form.state.isSubmitting ? (
            <>
              Ajout...
              <Spinner />
            </>
          ) : (
            'Ajouter un livre ?'
          )}
        </Button>
      )}
    </div>
  );
}
