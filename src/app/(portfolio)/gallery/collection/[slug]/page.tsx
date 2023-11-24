import { Image } from '@nextui-org/react';
import { getCollectionByName } from '~/server/collection';

const Page = async ({ params }: { params: { slug: string } }) => {
  const collection = await getCollectionByName(params.slug);

  return (
    <main className="pt-2">
      <div className="relative w-full columns-1 gap-4 md:columns-2 lg:columns-3 2xl:columns-4 [&>div:not(:first-child)]:mt-4">
        {collection?.images.map((image) => (
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
