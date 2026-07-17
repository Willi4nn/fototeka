export const CATEGORIES = [
  'TODOS',
  'ANIVERSÁRIOS',
  'CASAMENTOS',
  'CORPORATIVOS',
  'DEBUTANTES',
  'OUTROS',
] as const;
export type Category = (typeof CATEGORIES)[number];

export type GalleryPhoto = {
  id: string;
  src: string;
  category: Exclude<Category, 'TODOS'>;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: string;
};
