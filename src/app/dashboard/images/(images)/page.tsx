import { Image } from '@nextui-org/react';

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
      <div className="relative w-full columns-1 gap-4 md:columns-2 lg:columns-3 2xl:columns-4 [&>div:not(:first-child)]:mt-4">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            alt={image.alt ?? ''}
            width={image.width}
            height={image.height}
            classNames={{
              wrapper: 'relative max-w-full w-full h-full',
              img: 'object-contain w-full',
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
