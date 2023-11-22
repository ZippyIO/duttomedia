'use client';

import { NextUIProvider } from '@nextui-org/react';

import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
