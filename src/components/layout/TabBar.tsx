'use client';

import { AlbumIcon, ApertureIcon, UserIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import TabBarItem from '~/components/layout/TabBarItem';

const TabBar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 z-20 flex w-full items-end justify-around border-t border-divider bg-background pt-1.5 sm:hidden">
      <TabBarItem href="/" pathname={pathname} icon={<AlbumIcon size={25} strokeWidth={1.5} />}>
        <span>Portfolio</span>
      </TabBarItem>
      <TabBarItem
        href="/gallery"
        icon={<ApertureIcon size={25} strokeWidth={1.5} />}
        pathname={pathname}
        wildcardPathname
      >
        <span>Gallery</span>
      </TabBarItem>
      <TabBarItem
        href="/about"
        pathname={pathname}
        icon={<UserIcon size={25} strokeWidth={1.5} />}
        wildcardPathname
      >
        <span>About</span>
      </TabBarItem>
    </div>
  );
};

export default TabBar;
