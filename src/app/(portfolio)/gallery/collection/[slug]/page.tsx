import GalleryClient from '~/components/gallery/GalleryClient';
import { getCollectionByName } from '~/server/collection';

const Page = async ({ params }: { params: { slug: string } }) => {
  const collection = await getCollectionByName(params.slug);

  return (
    <main className="mx-auto pt-2">
      {collection && <GalleryClient images={collection.images} />}
    </main>
  );
};

export default Page;
