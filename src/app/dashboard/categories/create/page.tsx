import { Card, CardBody } from '@nextui-org/react';

import CategoryForm from '~/components/dashboard/category/CategoryForm';
import Breadcrumbs, { type Breadcrumb } from '~/components/ui/Breadcrumbs';

const breadcrunmbs = [
  {
    href: '/dashboard/categories',
    name: 'Categories',
  },
  {
    href: '/dashboard/categories/create',
    name: 'Create',
  },
] as Breadcrumb[];

const Page = () => {
  return (
    <main className="flex flex-col items-start gap-2 p-2">
      <Breadcrumbs breadcrumbs={breadcrunmbs} size="lg" />
      <div className="w-full max-w-xs">
        <Card>
          <CardBody className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Create Category</h2>
            <CategoryForm redirectPath="/dashboard/categories" className="flex flex-col gap-2" />
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default Page;
