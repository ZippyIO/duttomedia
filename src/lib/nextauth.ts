import { PrismaAdapter } from '@auth/prisma-adapter';
import { type PrismaClient } from '@prisma/client';

import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { NextResponse } from 'next/server';
import z from 'zod';

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
    signIn: async ({ account }) => {
      //? Check if user exists in database
      //? if not return false to prevent sign in
      const pId = account?.providerAccountId;
      const id = z.string().min(1).safeParse(pId);
      if (!id.success) {
        return false;
      }

      const isExistingUser = await db.account.findFirst({
        where: { providerAccountId: id.data },
      });

      if (!isExistingUser) {
        return false;
      }

      return true;
    },
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
