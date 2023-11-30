'use client';

import {
  BreadcrumbItem,
  Breadcrumbs as NuiBreadcrumbs,
  type BreadcrumbsProps as NuiBreadcrumbsProps,
} from '@nextui-org/react';

export type Breadcrumb = {
  href: string;
  name: string;
};

type BreadcrumbsProps = NuiBreadcrumbsProps & {
  breadcrumbs: Breadcrumb[];
};

const Breadcrumbs = ({ breadcrumbs, ...props }: BreadcrumbsProps) => {
  return (
    <>
      <NuiBreadcrumbs {...props}>
        {breadcrumbs.map(({ href, name }) => (
          <BreadcrumbItem key={href} href={href}>
            {name}
          </BreadcrumbItem>
        ))}
      </NuiBreadcrumbs>
    </>
  );
};

export default Breadcrumbs;
