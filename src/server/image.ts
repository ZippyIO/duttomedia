'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from '~/lib/db';
import { auth } from '~/lib/nextauth';
import { type ImagePayload, ImageValidator } from '~/lib/validators/Image';

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
    })
    .then(() => {
      revalidatePath('/dashboard');
      if (redirectPath) {
        redirect(redirectPath);
      }
    });
}
