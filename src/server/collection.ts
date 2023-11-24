'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from '~/lib/db';
import { auth } from '~/lib/nextauth';
import { type CollectionPayload, CollectionValidator } from '~/lib/validators/Collection';
export async function createCollection(data: CollectionPayload, redirectPath?: string) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const { name, description, categoryId } = CollectionValidator.parse(data);

  await db.collection
    .create({
      data: {
        name: name,
        description: description,
        categoryId: categoryId,
      },
    })
    .then(() => {
      revalidatePath('/dashboard');
      if (redirectPath) {
        redirect(redirectPath);
      }
    });
}
