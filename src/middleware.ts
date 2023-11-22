import NextAuth from 'next-auth';

import { authConfig } from '~/lib/nextauth';

export const { auth: middleware } = NextAuth(authConfig);
export const config = {
  matcher: ['/dashboard'],
};
