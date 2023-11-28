'use client';

import { Button, Link } from '@nextui-org/react';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { createSlug } from '~/lib/utils';

type CollectionsNavProps = {
  collections: {
    id: string;
    name: string;
  }[];
};

const CollectionsNav = ({ collections }: CollectionsNavProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-fit w-full items-center justify-center gap-2 rounded-medium p-2">
      <Button
        as={Link}
        href="/gallery"
        size="sm"
        radius="md"
        variant={pathname === '/gallery' ? 'shadow' : 'solid'}
        color={pathname === '/gallery' ? 'primary' : 'default'}
        className={clsx([pathname !== '/gallery' && '!bg-default-100'])}
      >
        All
      </Button>
      {collections.map((collection) => {
        const slug = createSlug(collection.name);
        return (
          <Button
            key={collection.id}
            as={Link}
            href={`/gallery/collection/${slug}`}
            size="sm"
            radius="md"
            variant={pathname === `/gallery/collection/${slug}` ? 'shadow' : 'solid'}
            color={pathname === `/gallery/collection/${slug}` ? 'primary' : 'default'}
            className={clsx([pathname !== `/gallery/collection/${slug}` && '!bg-default-100'])}
          >
            {collection.name}
          </Button>
        );
      })}
    </div>
  );
};

export default CollectionsNav;
