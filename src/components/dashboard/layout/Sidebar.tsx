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
      <SidebarLink href="/dashboard/images" pathname={pathname} wildcardPathname>
        Images
      </SidebarLink>
      <SidebarLink href="/dashboard/collections" pathname={pathname} wildcardPathname>
        Collections
      </SidebarLink>
      <SidebarLink href="/dashboard/categories" pathname={pathname} wildcardPathname>
        Categories
      </SidebarLink>
      <SidebarLink href="/dashboard/settings" pathname={pathname} wildcardPathname>
        Settings
      </SidebarLink>
    </div>
  );
};

export default Sidebar;
