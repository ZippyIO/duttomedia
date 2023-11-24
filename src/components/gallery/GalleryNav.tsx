'use client';

import { Button, Link } from '@nextui-org/react';

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
    <div className="flex h-fit w-full items-center justify-center gap-2 rounded-medium bg-default-100 p-2">
      <Button
        as={Link}
        href="/gallery"
        size="sm"
        radius="md"
        color={pathname === '/gallery' ? 'primary' : 'default'}
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
            color={pathname === `/gallery/collection/${slug}` ? 'primary' : 'default'}
          >
            {collection.name}
          </Button>
        );
      })}
    </div>
  );
};

export default CollectionsNav;
