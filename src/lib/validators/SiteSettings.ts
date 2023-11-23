import { z } from 'zod';

export const SiteSettingsValidator = z.object({
  allowNewUsers: z.boolean(),
});

export type SiteSettingsPayload = z.infer<typeof SiteSettingsValidator>;
