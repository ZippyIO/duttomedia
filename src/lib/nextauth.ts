import { PrismaAdapter } from '@auth/prisma-adapter';
import { type PrismaClient } from '@prisma/client';

import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { NextResponse } from 'next/server';

import db from '~/lib/db';

export const authConfig = {
  adapter: PrismaAdapter(db as unknown as PrismaClient),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    authorized: ({ request, auth }) => {
      if (!auth?.user) {
        const url = request.nextUrl.toString();
        const pathname = '/dashboard/login';

        return NextResponse.redirect(new URL(pathname, url));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);
