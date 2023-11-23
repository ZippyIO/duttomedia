'use client';

import { NextUIProvider } from '@nextui-org/react';

import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        {children}
        <Toaster />
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
