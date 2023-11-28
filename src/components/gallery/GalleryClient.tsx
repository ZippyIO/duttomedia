'use client';

import { Image, useDisclosure } from '@nextui-org/react';
import { type Image as PrismaImage } from '@prisma/client';

import NextImage from 'next/image';
import { useEffect, useMemo } from 'react';

import CarouselModal from '~/components/CarouselModal';
import { useSearchParams } from '~/hooks/use-search-params';

type GalleryClientProps = {
  images: Omit<PrismaImage, 'collectionId'>[];
};

const GalleryClient = ({ images }: GalleryClientProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { setSearchParam, getSearchParam } = useSearchParams();

  const imageSearchParam = useMemo(() => {
    const imageParam = getSearchParam('image');
    if (imageParam) {
      return Number(imageParam);
    }

    return undefined;
  }, [getSearchParam]);

  useEffect(() => {
    const hasImageParam = () => {
      if (imageSearchParam !== undefined) {
        onOpen();
      } else {
        onClose();
      }
    };

    hasImageParam();
  }, [imageSearchParam, onClose, onOpen]);

  return (
    <>
      <CarouselModal
        images={images}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
      <div className="masonry masonry-sm md:masonry-md lg:masonry-lg 2xl:masonry-xl mx-auto [&>div:not(:first-child)]:mt-4">
        {images.map((image, i) => (
          <Image
            key={image.id}
            as={NextImage}
            onClick={() => setSearchParam('image', i.toString())}
            src={image.url}
            alt={image.alt ?? ''}
            width={image.width}
            height={image.height}
            classNames={{
              wrapper: 'max-w-full w-full h-full break-inside',
              img: 'w-full cursor-pointer',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GalleryClient;
