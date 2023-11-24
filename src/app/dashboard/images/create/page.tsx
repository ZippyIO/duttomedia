import { Card, CardBody } from '@nextui-org/react';

import ImageForm from '~/components/dashboard/image/ImageForm';
import { getCollections } from '~/server/collection';

const Page = async () => {
  const collections = await getCollections({
    id: true,
    name: true,
    description: false,
    createdAt: false,
    updatedAt: false,
    category: undefined,
    images: undefined,
  });

  return (
    <main className="flex justify-start p-2">
      <div className="w-full">
        <Card>
          <CardBody className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Create Image</h2>
            <ImageForm
              collections={collections}
              redirectPath="/dashboard/images"
              className="flex flex-col gap-2"
            />
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default Page;
