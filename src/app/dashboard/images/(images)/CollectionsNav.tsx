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
        href="/dashboard/images"
        size="sm"
        radius="md"
        variant={pathname === '/dashboard/images' ? 'shadow' : 'solid'}
        color={pathname === '/dashboard/images' ? 'primary' : 'default'}
        className={clsx([pathname !== '/dashboard/images' && '!bg-default-100'])}
      >
        All
      </Button>
      {collections.map((collection) => {
        const slug = createSlug(collection.name);
        return (
          <Button
            key={collection.id}
            as={Link}
            href={`/dashboard/images/collection/${slug}`}
            size="sm"
            radius="md"
            variant={pathname === `/dashboard/images/collection/${slug}` ? 'shadow' : 'solid'}
            color={pathname === `/dashboard/images/collection/${slug}` ? 'primary' : 'default'}
            className={clsx([
              pathname !== `/dashboard/images/collection/${slug}` && '!bg-default-100',
            ])}
          >
            {collection.name}
          </Button>
        );
      })}
    </div>
  );
};

export default CollectionsNav;
