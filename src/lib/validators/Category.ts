import { z } from 'zod';

export const CategoryValidator = z.object({
  name: z.string().min(1, { message: 'Category name must be at least 1 character long.' }),
  description: z.string().optional(),
});

export type CategoryPayload = z.infer<typeof CategoryValidator>;
