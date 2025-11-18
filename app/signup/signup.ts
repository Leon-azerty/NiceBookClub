import { authClient } from '@/lib/auth-client'; //import the auth client
import { Dispatch, SetStateAction } from 'react';

export async function signUpUser({
  email,
  password, // min 8 characters by default
  name,
  image, // User image URL (optional)
  router,
  setIsLoading,
}: {
  email: string;
  password: string;
  name: string;
  image?: string;
  router: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, error } = await authClient.signUp.email(
    {
      email,
      password,
      name,
      image,
      callbackURL: '/', // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: (ctx) => {
        setIsLoading(true);

        //show loading
        console.log('onrequest', ctx);
      },
      onSuccess: async (ctx) => {
        setIsLoading(false);

        console.log('onSuccess', ctx);
        const res = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: ctx.data.user.email,
          }),
        });
        console.log('res', res);
      },
      onError: (ctx) => {
        setIsLoading(false);

        console.log('onError', ctx);
        // display the error message
        alert(ctx.error.message);
      },
    }
  );
  return { data, error };
}
