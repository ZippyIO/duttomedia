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
      try {
        const [siteSettings, accountCount] = await Promise.all([
          db.siteSettings.findUnique({ where: { id: 'settings' } }),
          db.account.count(),
        ]);

        if (accountCount === 0) {
          await db.siteSettings.upsert({
            where: { id: 'settings' },
            create: { allowNewUsers: false },
            update: { allowNewUsers: false },
          });
          return true;
        }

        if (accountCount > 0 && !siteSettings?.allowNewUsers) {
          const id = z
            .string()
            .min(1)
            .safeParse(account?.providerAccountId);
          if (!id.success) {
            return false;
          }

          const isExistingUser = await db.account.findFirst({
            where: { providerAccountId: id.data },
          });

          return Boolean(isExistingUser);
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    authorized: ({ request, auth }) => {
      if (!auth?.user) {
        const url = request.nextUrl.toString();
        const pathname = '/auth/login';

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
