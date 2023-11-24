'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import db from '~/lib/db';
import { auth } from '~/lib/nextauth';
import { slugToString } from '~/lib/utils';
import { type CollectionPayload, CollectionValidator } from '~/lib/validators/Collection';
import { type CollectionSelectOptions } from '~/types/types';

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

export async function getCollections(
  select: Partial<CollectionSelectOptions> = {
    id: true,
    createdAt: false,
    updatedAt: false,
    name: true,
    description: true,
    category: {
      id: true,
      createdAt: false,
      updatedAt: false,
      name: true,
      description: true,
    },
    images: {
      id: true,
      createdAt: false,
      updatedAt: false,
      name: true,
      description: true,
      alt: true,
      fileId: true,
      url: true,
      width: true,
      height: true,
      collectionId: true,
    },
  },
) {
  const collections = await db.collection.findMany({
    select: {
      id: select.id,
      createdAt: select.createdAt,
      updatedAt: select.updatedAt,
      name: select.name,
      description: select.description,
      category: select.category
        ? {
            select: {
              id: select.category.id,
              createdAt: select.category.createdAt,
              updatedAt: select.category.updatedAt,
              name: select.category.name,
              description: select.category.description,
              collections: false,
            },
          }
        : undefined,
      images: select.images
        ? {
            select: {
              id: select.images.id,
              createdAt: select.images.createdAt,
              updatedAt: select.images.updatedAt,
              name: select.images.name,
              description: select.images.description,
              alt: select.images.alt,
              fileId: select.images.fileId,
              url: select.images.url,
              width: select.images.width,
              height: select.images.height,
              collectionId: select.images.collectionId,
            },
          }
        : undefined,
    },
  });

  return collections;
}

export async function getCollectionByName(
  name: string,
  select: Partial<CollectionSelectOptions> = {
    id: true,
    createdAt: false,
    updatedAt: false,
    name: true,
    description: true,
    category: {
      id: true,
      createdAt: false,
      updatedAt: false,
      name: true,
      description: true,
    },
    images: {
      id: true,
      createdAt: false,
      updatedAt: false,
      name: true,
      description: true,
      alt: true,
      fileId: true,
      url: true,
      width: true,
      height: true,
      collectionId: true,
    },
  },
) {
  const parsedName = z
    .string()
    .min(1)
    .transform((str) => slugToString(str))
    .parse(name);

  const collection = await db.collection.findFirst({
    where: {
      name: {
        contains: parsedName,
        mode: 'insensitive',
      },
    },
    select: {
      id: select.id,
      createdAt: select.createdAt,
      updatedAt: select.updatedAt,
      name: select.name,
      description: select.description,
      category: select.category
        ? {
            select: {
              id: select.category.id,
              createdAt: select.category.createdAt,
              updatedAt: select.category.updatedAt,
              name: select.category.name,
              description: select.category.description,
              collections: false,
            },
          }
        : undefined,
      images: select.images
        ? {
            select: {
              id: select.images.id,
              createdAt: select.images.createdAt,
              updatedAt: select.images.updatedAt,
              name: select.images.name,
              description: select.images.description,
              alt: select.images.alt,
              fileId: select.images.fileId,
              url: select.images.url,
              width: select.images.width,
              height: select.images.height,
              collectionId: select.images.collectionId,
            },
          }
        : undefined,
    },
  });

  return collection;
}
