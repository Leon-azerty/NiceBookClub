'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page({}: {}) {
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token || typeof token !== 'string') {
    console.log("'Invalid token'");
    return <p>Invalid token</p>;
  }

  console.log('token', token);

  const UpdatePassword = async () => {
    const { data, error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    if (error) {
      console.log('error', error);
    }
    console.log('data', data);
  };

  return (
    <section>
      <p>Token received: {token}</p>

      {/* Ajout d'un form avec tanstack Form */}

      <Label htmlFor="password">New Password</Label>
      <Input
        id="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button onClick={UpdatePassword}>Update Password</Button>
    </section>
  );
}
