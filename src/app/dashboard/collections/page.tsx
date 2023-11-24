import CollectionsTable from '~/components/dashboard/collection/CollectionsTable';
import { getCollections } from '~/server/collection';

const Page = async () => {
  const collections = await getCollections({
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    description: true,
    category: {
      id: true,
      name: true,
      description: true,
    },
    images: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      description: true,
      alt: true,
      fileId: true,
      url: true,
      width: true,
      height: true,
      collectionId: true,
    },
  });

  return (
    <main className="flex flex-col gap-2">
      <div className="flex justify-center p-2">
        <h2 className="text-2xl font-semibold">Collections</h2>
      </div>
      <div className="px-4">
        <CollectionsTable collections={collections} />
      </div>
    </main>
  );
};

export default Page;
