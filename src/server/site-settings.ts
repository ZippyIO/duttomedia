'use server';

import { revalidatePath } from 'next/cache';

import db from '~/lib/db';
import { type SiteSettingsPayload, SiteSettingsValidator } from '~/lib/validators/SiteSettings';

export async function updateSiteSettings(data: SiteSettingsPayload) {
  const validatedData = SiteSettingsValidator.parse(data);

  await db.siteSettings
    .upsert({
      where: {
        id: 'settings',
      },
      create: {
        allowNewUsers: validatedData.allowNewUsers,
      },
      update: {
        allowNewUsers: validatedData.allowNewUsers,
      },
    })
    .then(() => {
      revalidatePath('/dashboard/settings');
    });
}

export async function getSiteSettings() {
  const siteSettings = await db.siteSettings.findUnique({
    where: { id: 'settings' },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      allowNewUsers: true,
    },
  });

  return siteSettings;
}
