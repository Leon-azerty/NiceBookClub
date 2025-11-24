'use client';

import Spinner from '@/components/skeleton/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';
import { signIn } from './signin';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signInSchema = z.object({
    mail: z.string().email(),
    password: z.string().min(10, 'password should be greater than 10'),
  });

  const form = useForm({
    defaultValues: {
      mail: '',
      password: '',
    },
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      await signIn({
        email: values.value.mail,
        password: values.value.password,
        router,
        setError,
      });
      setIsLoading(false);
    },
    validators: {
      onChangeAsync: signInSchema,
      onChangeAsyncDebounceMs: 2000,
    },
  });
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <form.Field
          name="mail"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="mail">mail</Label>
              <Input
                id="mail"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <p className="text-destructive text-sm">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">password</Label>
              <div>
                <Input
                  id="password"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <p className="text-destructive text-sm">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm hover:underline"
                  >
                    Forgot password ?
                  </Link>
                </div>
              </div>
            </div>
          )}
        />
        {error && <p className="text-destructive">{error}</p>}
        <Button type="submit" onClick={form.handleSubmit}>
          {isLoading && <Spinner />}
          Submit
        </Button>
        {/* <Button type="reset" onClick={form.reset}>
          Reset
        </Button> */}
      </form>
      <div>
        Don&apos;t have an account ? click
        <Link href="/signup" className="hover:underline">
          here to signup
        </Link>
      </div>
    </main>
  );
}
