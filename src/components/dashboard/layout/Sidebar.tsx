'use client';

import { usePathname } from 'next/navigation';

import SidebarLink from '~/components/dashboard/layout/SidebarLink';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1 border-r border-divider p-2">
      <SidebarLink href="/dashboard" pathname={pathname}>
        Overview
      </SidebarLink>
      <SidebarLink href="/dashboard/gallery" pathname={pathname} wildcardPathname>
        Gallery
      </SidebarLink>
      <SidebarLink href="/dashboard/settings" pathname={pathname} wildcardPathname>
        Settings
      </SidebarLink>
    </div>
  );
};

export default Sidebar;
