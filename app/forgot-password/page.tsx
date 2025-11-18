'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');

  const ResetPasword = async (params: any) => {
    const { data, error } = await authClient.requestPasswordReset({
      email: email,
      redirectTo: '/forgot-password/verify-token',
    });

    if (error) {
      console.log('error', error);
    }
    console.log('data', data);
  };

  return (
    <section>
      <Label htmlFor="email">Email</Label>
      <p>{email}</p>
      <Input onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={ResetPasword}>Reset Password</Button>
    </section>
  );
}
