'use client';

import { Button, Card, CardBody, CardHeader, Divider, Switch } from '@nextui-org/react';
import { type SiteSettings } from '@prisma/client';

import { Controller, useForm } from 'react-hook-form';

import { type SiteSettingsPayload } from '~/lib/validators/SiteSettings';
import { updateSiteSettings } from '~/server/site-settings';

type Props = {
  siteSettings: SiteSettings;
};

const PageClient = ({ siteSettings }: Props) => {
  const form = useForm<SiteSettingsPayload>({
    defaultValues: {
      allowNewUsers: siteSettings.allowNewUsers,
    },
  });

  async function onSubmit(data: SiteSettingsPayload) {
    await updateSiteSettings(data);
  }

  return (
    <div className="flex justify-center p-2">
      <Card className="p-2">
        <CardHeader>
          <h3 className="text-xl font-semibold">Site Settings</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Controller
              control={form.control}
              name="allowNewUsers"
              render={({ field: { value, onChange } }) => (
                <Switch isSelected={value} onChange={(e) => onChange(e.target.checked)} size="sm">
                  Allow new users
                </Switch>
              )}
            />
            <Button type="submit" size="sm" color="primary">
              Update Settings
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default PageClient;
