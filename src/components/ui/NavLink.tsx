import { Link, type LinkProps } from '@nextui-org/react';

export type NavLinkProps = LinkProps & {
  href: string;
  pathname: string;
  activeColor?: LinkProps['color'];
};

const NavLink = ({ href, pathname, activeColor, ...props }: NavLinkProps) => {
  const color = href === pathname ? activeColor ?? 'primary' : 'foreground';

  return <Link href={href} color={color} {...props} />;
};

export default NavLink;
