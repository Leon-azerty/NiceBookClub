'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import VerifyTokenForm from './verifyTokenForm';

function TokenFromSearchParams() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  return <VerifyTokenForm token={token} />;
}

export default function Page() {
  return (
    <Suspense fallback={<>...</>}>
      <TokenFromSearchParams />
    </Suspense>
  );
}
