import { Link, NavbarItem, type LinkProps } from '@nextui-org/react';

export type NavbarLinkProps = LinkProps & {
  pathname: string;
  wildcardPathname?: boolean;
  activeColor?: LinkProps['color'];
  children: React.ReactNode;
};

const NavbarLink = ({
  pathname,
  wildcardPathname,
  activeColor,
  children,
  ...props
}: NavbarLinkProps) => {
  const activePath = wildcardPathname
    ? new RegExp(`^${props.href}(\\/|$)`).test(pathname)
    : props.href === pathname;

  return (
    <NavbarItem isActive={activePath}>
      <Link color={activePath ? activeColor ?? 'primary' : 'foreground'} {...props}>
        {children}
      </Link>
    </NavbarItem>
  );
};

export default NavbarLink;
