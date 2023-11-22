'use client';

import { Button } from '@nextui-org/react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GalleryNav = () => {
  const pathname = usePathname();

  return (
    <div className="bg-default-100 rounded-large flex h-fit w-fit items-center justify-center gap-2 p-1">
      <Button
        as={Link}
        href="/gallery/cars"
        size="sm"
        radius="lg"
        color={pathname === '/gallery/cars' ? 'primary' : 'default'}
      >
        Cars
      </Button>
      <Button
        as={Link}
        href="/gallery/landscape"
        size="sm"
        radius="lg"
        color={pathname === '/gallery/landscape' ? 'primary' : 'default'}
      >
        Landscape
      </Button>
    </div>
  );
};

export default GalleryNav;
