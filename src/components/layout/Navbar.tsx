'use client';

import {
  Link,
  Navbar as NuiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import { usePathname } from 'next/navigation';

import FacebookIcon from '~/components/icons/FacebookIcon';
import InstagramIcon from '~/components/icons/InstagramIcon';
import NavbarLink from '~/components/ui/NavbarLink';
import { nav_links, social_links } from '~/data/nav-data';

const Navbar = () => {
  const pathname = usePathname();

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
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link isExternal aria-label="Instagram" className="p-1" href={social_links.instagram}>
            <InstagramIcon className="fill-default-500 h-[20px] w-[20px]" />
          </Link>
          <Link isExternal aria-label="Instagram" className="p-1" href={social_links.facebook}>
            <FacebookIcon className="fill-default-500 h-[20px] w-[20px]" />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NuiNavbar>
  );
};

export default Navbar;
