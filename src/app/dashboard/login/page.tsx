'use client';

import { Button } from '@nextui-org/react';

import { signIn, signOut } from 'next-auth/react';

const Page = () => {
  return (
    <main>
      <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
      <Button onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}>Sign in</Button>
    </main>
  );
};

export default Page;
