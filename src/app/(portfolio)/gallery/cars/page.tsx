// import { Image } from '@nextui-org/react';
// import NextImage from 'next/image';

const Page = () => {
  return (
    <main className="h-[calc(100svh-64px)] p-4">
      <div className="relative h-full w-full columns-4 gap-4 [&>div:not(:first-child)]:mt-4">
        {/* {Array.from({ length: 20 }).map((_, i) => (
          <Image
            key={`sroc2023-${i + 1}`}
            as={NextImage}
            fill
            src={`/photos/cars/sroc2023-${i + 1}.jpg`}
            alt=""
            classNames={{
              wrapper: 'relative max-w-full w-full h-full',
              img: 'object-contain w-full',
            }}
          />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <Image
            key={`ncr2022-${i + 1}`}
            as={NextImage}
            fill
            src={`/photos/cars/ncr2022-${i < 9 ? `0${i + 1}` : i + 1}.jpg`}
            alt=""
            classNames={{
              wrapper: 'relative max-w-full w-full h-full',
              img: 'object-contain w-full',
            }}
          />
        ))} */}
      </div>
    </main>
  );
};

export default Page;
