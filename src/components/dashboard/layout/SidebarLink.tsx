import { Button, type ButtonProps, Link, type LinkProps } from '@nextui-org/react';

export type NavbarLinkProps = ButtonProps &
  LinkProps & {
    pathname: string;
    wildcardPathname?: boolean;
    activeColor?: LinkProps['color'];
    children: React.ReactNode;
  };

const SidebarLink = ({ pathname, wildcardPathname, children, ...props }: NavbarLinkProps) => {
  const activePath = wildcardPathname
    ? new RegExp(`^${props.href}(\\/|$)`).test(pathname)
    : props.href === pathname;

  return (
    <Button
      as={Link}
      size="md"
      radius="md"
      variant={activePath ? 'flat' : 'light'}
      color={activePath ? 'primary' : 'default'}
      className="justify-start"
      {...props}
    >
      {children}
    </Button>
  );
};

export default SidebarLink;
