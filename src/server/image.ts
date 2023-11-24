'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from '~/lib/db';
import { auth } from '~/lib/nextauth';
import { createSlug } from '~/lib/utils';
import { type ImagePayload, ImageValidator } from '~/lib/validators/Image';
import { type CollectionSelectOptions, type ImageSelectOptions } from '~/types/types';

export async function createImage(data: ImagePayload, redirectPath?: string) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const { name, description, alt, fileId, url, width, height, collectionId } =
    ImageValidator.parse(data);

  await db.image
    .create({
      data: {
        name: name,
        description: description,
        alt: alt,
        fileId: fileId,
        url: url,
        width: width,
        height: height,
        collectionId: collectionId,
      },
      select: {
        collection: {
          select: {
            name: true,
          },
        },
      },
    })
    .then((res) => {
      revalidatePath('/dashboard');
      if (res.collection) {
        revalidatePath(`/dashboard/images/collection/${createSlug(res.collection.name)}`);
      }

      if (redirectPath) {
        redirect(redirectPath);
      }
    });
}

type ImageSelectOptionsWithCollection = Partial<ImageSelectOptions> & {
  collection: Partial<CollectionSelectOptions>;
};
export async function getAllImages(
  select: ImageSelectOptionsWithCollection = {
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
    collection: {
      id: true,
      createdAt: false,
      updatedAt: false,
      name: true,
      description: true,
      category: undefined,
    },
  },
) {
  const images = await db.image.findMany({
    select: {
      id: select.id,
      createdAt: select.createdAt,
      updatedAt: select.updatedAt,
      name: select.name,
      description: select.description,
      alt: select.alt,
      fileId: select.fileId,
      url: select.url,
      width: select.width,
      height: select.height,
      collection: {
        select: {
          id: select.collection?.id,
          createdAt: select.collection?.createdAt,
          updatedAt: select.collection?.updatedAt,
          name: select.collection?.name,
          description: select.collection?.description,
          category: select.collection?.category
            ? {
                select: {
                  id: select.collection?.category?.id,
                  createdAt: select.collection?.category?.createdAt,
                  updatedAt: select.collection?.category?.updatedAt,
                  name: select.collection?.category?.name,
                  description: select.collection?.category?.description,
                },
              }
            : undefined,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return images;
}
