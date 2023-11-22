'use client';

import {
  Button,
  Link,
  Navbar as NuiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import FacebookIcon from '~/components/icons/FacebookIcon';
import InstagramIcon from '~/components/icons/InstagramIcon';
import NavbarLink from '~/components/ui/NavbarLink';
import { nav_links, social_links } from '~/data/nav-data';

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <NuiNavbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">DuttoMedia</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {nav_links.map((link) => (
          <NavbarLink
            key={link.href}
            href={link.href}
            pathname={pathname}
            wildcardPathname={link.wildcardPathname}
          >
            {link.name}
          </NavbarLink>
        ))}
        {session?.data?.user && (
          <NavbarLink key={'/dashboard'} href={'/dashboard'} pathname={pathname} wildcardPathname>
            Dashboard
          </NavbarLink>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link isExternal aria-label="Instagram" className="p-1" href={social_links.instagram}>
            <InstagramIcon className="h-[20px] w-[20px] fill-default-500" />
          </Link>
          <Link isExternal aria-label="Instagram" className="p-1" href={social_links.facebook}>
            <FacebookIcon className="h-[20px] w-[20px] fill-default-500" />
          </Link>
        </NavbarItem>
        {session?.data?.user && (
          <Button onClick={() => signOut({ callbackUrl: '/' })} size="sm" color="danger">
            Sign out
          </Button>
        )}
      </NavbarContent>
    </NuiNavbar>
  );
};

export default Navbar;
