'use client';

import { Divider, Link, type LinkProps } from '@nextui-org/react';

import clsx from 'clsx';
import { type ReactNode } from 'react';

export type TabBarItemProps = LinkProps & {
  icon: ReactNode;
  pathname: string;
  wildcardPathname?: boolean;
  activeColor?: LinkProps['color'];
  children: React.ReactNode;
};

const TabBarItem = ({
  icon,
  pathname,
  wildcardPathname,
  activeColor,
  children,
  ...props
}: TabBarItemProps) => {
  const activePath = wildcardPathname
    ? new RegExp(`^${props.href}(\\/|$)`).test(pathname)
    : props.href === pathname;
  return (
    <Link
      className={clsx([
        'flex flex-col items-center gap-1 text-small hover:opacity-100',
        activePath ? activeColor ?? 'text-primary' : 'text-default-500',
      ])}
      {...props}
    >
      {icon}
      {children}
      <Divider
        className={clsx(['h-[2px]', activePath ? activeColor ?? 'bg-primary' : 'bg-content1'])}
      />
    </Link>
  );
};

export default TabBarItem;
