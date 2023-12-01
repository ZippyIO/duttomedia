'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import db from '~/lib/db';
import { auth } from '~/lib/nextauth';
import { createSlug, slugToString } from '~/lib/utils';
import { type CollectionPayload, CollectionValidator } from '~/lib/validators/Collection';
import { type ImagePayload, ImageValidator } from '~/lib/validators/Image';
import { type CollectionSelectOptions } from '~/types/types';

export async function createCollection(
  collectionData: CollectionPayload,
  imageData: ImagePayload,
  redirectPath?: string,
) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const parsedCollection = CollectionValidator.parse(collectionData);
  const parsedImage = ImageValidator.parse(imageData);

  await db
    .$transaction(async (tx) => {
      const image = await tx.image.create({
        data: {
          name: parsedImage.name,
          description: parsedImage.description,
          alt: parsedImage.alt,
          fileId: parsedImage.fileId,
          url: parsedImage.url,
          width: parsedImage.width,
          height: parsedImage.height,
          collectionId: parsedImage.collectionId,
        },
        select: {
          id: true,
        },
      });

      const collection = await tx.collection.create({
        data: {
          name: parsedCollection.name,
          description: parsedCollection.description,
          categoryId: parsedCollection.categoryId,
        },
        select: {
          id: true,
          name: true,
        },
      });

      await tx.coverImage.create({
        data: {
          imageId: image.id,
          collectionId: collection.id,
        },
      });

      return collection.name;
    })
    .then((res) => {
      revalidatePath('/dashboard', 'layout');
      revalidatePath('/gallery');
      revalidatePath(`/gallery/collection/${createSlug(res)}`);

      if (redirectPath) redirect(redirectPath);
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
