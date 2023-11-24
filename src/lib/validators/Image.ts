import { z } from 'zod';

export const ImageValidator = z.object({
  name: z.string().min(0, { message: 'Image name must be at least 0 character long.' }),
  description: z.string().optional(),
  alt: z.string().optional(),
  fileId: z.string().min(1, { message: 'File ID must be at least 1 character long.' }),
  url: z.string().min(1, { message: 'URL must be at least 1 character long.' }),
  width: z.number().min(1, { message: 'Width must be at least 1.' }),
  height: z.number().min(1, { message: 'Height must be at least 1.' }),
  collectionId: z.string().optional(),
});

export type ImagePayload = z.infer<typeof ImageValidator>;
