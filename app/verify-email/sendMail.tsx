'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export default function SendMail({ email }: { email: string }) {
  const SendNewVerificationMail = async () => {
    await authClient.sendVerificationEmail({
      email,
      callbackURL: '/profile',
    });
  };
  return (
    <section>
      <Button onClick={() => SendNewVerificationMail}>Send email</Button>
    </section>
  );
}
