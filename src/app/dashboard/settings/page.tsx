import PageClient from '~/app/dashboard/settings/client';
import { getSiteSettings } from '~/server/site-settings';

const Page = async () => {
  const siteSettings = await getSiteSettings();

  return <main>{siteSettings && <PageClient siteSettings={siteSettings} />}</main>;
};

export default Page;
