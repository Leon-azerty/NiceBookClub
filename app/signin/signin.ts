import { authClient } from '@/lib/auth-client'; //import the auth client
import { Dispatch, SetStateAction } from 'react';

export async function signIn({
  email,
  password,
  router,
  setError,
}: {
  email: string;
  password: string;
  router: any;
  setError: Dispatch<SetStateAction<string | null>>;
}) {
  const { data, error } = await authClient.signIn.email(
    {
      /**
       * The user email
       */
      email,
      /**
       * The user password
       */
      password,
      /**
       * A URL to redirect to after the user verifies their email (optional)
       */
      callbackURL: '/profile',
      /**
       * remember the user session after the browser is closed.
       * @default true
       */
      rememberMe: false,
    },
    {
      //callbacks
      onError: (ctx) => {
        console.log('ctx', ctx);
        // Handle the error
        if (ctx.error.status === 403) {
          router.push(`/verify-email`);
          // alert('Please verify your email address');
        }
        if (ctx.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
          setError('Invalid email and password');
        }
        // //you can also show the original error message
        // alert(ctx.error.message);
      },
    }
  );
}
