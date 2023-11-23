import { Card, CardBody } from '@nextui-org/react';

import CategoryForm from '~/components/dashboard/category/CategoryForm';

const Page = () => {
  return (
    <main className="flex justify-start p-2">
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
