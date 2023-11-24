'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from '~/lib/db';
import { auth } from '~/lib/nextauth';
import { type CategoryPayload, CategoryValidator } from '~/lib/validators/Category';
import { type CategorySelectOptions } from '~/types/types';

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
      revalidatePath('/dashboard');
      if (redirectPath) {
        redirect(redirectPath);
      }
    });
}

export async function getCategories(
  select: Partial<CategorySelectOptions> = {
    id: true,
    createdAt: false,
    updatedAt: false,
    name: true,
    description: true,
    collections: false,
  },
) {
  const categories = await db.category.findMany({
    select: {
      id: select.id,
      createdAt: select.createdAt,
      updatedAt: select.updatedAt,
      name: select.name,
      description: select.description,
      collections: select.collections
        ? {
            select: {
              id: true,
              name: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          }
        : undefined,
    },
  });

  return categories;
}
