import { Button, Link } from '@nextui-org/react';

import { PlusIcon } from 'lucide-react';

import CollectionsNav from '~/app/dashboard/images/(images)/CollectionsNav';
import db from '~/lib/db';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const collections = await db.collection.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <div className="flex items-center justify-center pb-2">
        <h2 className="ml-auto text-2xl font-semibold">Images</h2>
        <Button
          as={Link}
          href="/dashboard/images/create"
          size="sm"
          color="primary"
          endContent={<PlusIcon size={18} strokeWidth={1.85} />}
          className="ml-auto"
        >
          Add New
        </Button>
      </div>
      <CollectionsNav collections={collections} />
      {children}
    </div>
  );
};

export default Layout;
