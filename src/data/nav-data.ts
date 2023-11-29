export const nav_links = [
  { name: 'Portfolio', href: '/', wildcardPathname: false },
  { name: 'Gallery', href: '/gallery', wildcardPathname: true },
  { name: 'About', href: '/about', wildcardPathname: false },
] as const;

export const social_links = {
  instagram: 'https://www.instagram.com/duttomedia/',
  facebook: 'https://www.facebook.com/DuttoMedia',
} as const;
