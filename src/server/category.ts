'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from '~/lib/db';
import { auth } from '~/lib/nextauth';
import { type CategoryPayload, CategoryValidator } from '~/lib/validators/Category';

export async function createCategory(data: CategoryPayload, redirectPath?: string) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const { name, description } = CategoryValidator.parse(data);

  await db.category
    .create({
      data: {
        name: name,
        description: description,
      },
    })
    .then(() => {
      revalidatePath('/dashboard/categories');
      if (redirectPath) {
        redirect(redirectPath);
      }
    });
}
