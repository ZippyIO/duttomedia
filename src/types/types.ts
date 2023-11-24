import { type Category, type Collection, type Image } from '@prisma/client';

import { type SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ImageSelectOptions = Record<keyof Image, boolean>;
export type CategorySelectOptions = Record<keyof Category, boolean> & { collections: boolean };
export type CollectionSelectOptions = Record<keyof Omit<Collection, 'categoryId'>, boolean> & {
  category: Partial<Omit<CategorySelectOptions, 'collections'>>;
  images: Partial<ImageSelectOptions>;
};

export type ImageFile = {
  file?: File;
  properties?: {
    width: number;
    height: number;
  };
};
