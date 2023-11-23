'use client';

import { NextUIProvider } from '@nextui-org/react';

import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

import { EdgeStoreProvider } from '~/lib/edgestore';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <SessionProvider>
      <EdgeStoreProvider>
        <NextUIProvider navigate={router.push}>
          {children}
          <Toaster />
        </NextUIProvider>
      </EdgeStoreProvider>
    </SessionProvider>
  );
};

export default Providers;
