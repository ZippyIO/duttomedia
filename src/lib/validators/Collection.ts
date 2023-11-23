import { z } from 'zod';

export const CollectionValidator = z.object({
  name: z.string().min(1, { message: 'Collection name must be at least 1 character long.' }),
  description: z.string().optional(),
  categoryId: z.string().optional(),
});

export type CollectionPayload = z.infer<typeof CollectionValidator>;
