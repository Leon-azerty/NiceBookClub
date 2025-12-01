'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/router';

export default function Signout() {
  const router = useRouter();
  return (
    <section>
      <Button
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onRequest: (request) => {
                console.log('onrequest', request);
              },
              onSuccess: () => {
                console.log('signout good, redirection');
                router.push('/login');
              },
              onError: (err) => {
                console.error('error', err);
              },
            },
          })
        }
      >
        Sign out
      </Button>
    </section>
  );
}
