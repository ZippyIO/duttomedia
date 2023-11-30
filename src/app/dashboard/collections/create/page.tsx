import { Card, CardBody } from '@nextui-org/react';

import CollectionForm from '~/components/dashboard/collection/CollectionForm';
import Breadcrumbs, { type Breadcrumb } from '~/components/ui/Breadcrumbs';
import { getCategories } from '~/server/category';

const breadcrunmbs = [
  {
    href: '/dashboard/collections',
    name: 'Collections',
  },
  {
    href: '/dashboard/collections/create',
    name: 'Create',
  },
] as Breadcrumb[];

const Page = async () => {
  const categories = await getCategories({
    id: true,
    createdAt: false,
    updatedAt: false,
    name: true,
    description: false,
    collections: false,
  });

  return (
    <main className="flex flex-col items-start gap-2 p-2">
      <Breadcrumbs breadcrumbs={breadcrunmbs} size="lg" />
      <div className="w-full max-w-xs">
        <Card>
          <CardBody className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Create Collection</h2>
            <CollectionForm
              categories={categories}
              redirectPath="/dashboard/collections"
              className="flex flex-col gap-2"
            />
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default Page;
