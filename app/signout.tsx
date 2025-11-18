'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Signout() {
  const router = useRouter();
  return (
    <section>
      <Button
        onClick={async () => {
          console.log('signing out');
          const res = await authClient.signOut();
          console.log('res', res);

          if (res.error) {
            console.error('error during signout');
          }

          if (res.data?.success) {
            console.log('redirection');
            router.push('/signin');
          }
        }}
      >
        Sign out
        <LogOut />
      </Button>
    </section>
  );
}
