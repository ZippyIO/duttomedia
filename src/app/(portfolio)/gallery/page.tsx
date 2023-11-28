import GalleryClient from '~/components/gallery/GalleryClient';
import { getAllImages } from '~/server/image';

const Page = async () => {
  const images = await getAllImages({
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
    collection: {
      id: true,
      createdAt: false,
      updatedAt: false,
      name: true,
      description: true,
      category: undefined,
    },
  });

  return (
    <main className="pt-2">
      <GalleryClient images={images} />
    </main>
  );
};

export default Page;
