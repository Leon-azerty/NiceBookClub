'use client';

import Spinner from '@/components/skeleton/spinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';
import { signUpUser } from './signup';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [shouldShowForm, setShouldShowForm] = useState(true);

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
      const { data, error } = await signUpUser({
        email: values.value.mail,
        password: values.value.password,
        name: 'test',
        router,
        setIsLoading,
      });
      if (error) {
        console.error('error', error);
        return;
      }
      setShouldShowForm(false);
    },
    validators: {
      onChangeAsync: signInSchema,
      onChangeAsyncDebounceMs: 2000,
    },
  });
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      {shouldShowForm ? (
        <>
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
                <>
                  <Label htmlFor="mail">mail</Label>
                  <Input
                    id="mail"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-destructive mt-1 text-sm">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </>
              )}
            />

            <form.Field
              name="password"
              children={(field) => (
                <>
                  <Label htmlFor="password">password</Label>
                  <Input
                    id="password"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-destructive mt-1 text-sm">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </>
              )}
            />
            <Button type="submit" onClick={form.handleSubmit}>
              {isLoading && <Spinner />}
              Submit
            </Button>
            {/* <Button type="reset" onClick={form.reset}>
          Reset
          </Button> */}
          </form>
          <div>
            Already have an account ? click{' '}
            <Link href="/signin" className="hover:underline">
              here to signin
            </Link>
          </div>
        </>
      ) : (
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              We have sent you a mail to your address mail. Please verify your
              email before log in
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Button asChild>
              <Link href="signin">Done</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
