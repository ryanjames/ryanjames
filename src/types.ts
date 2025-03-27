export type TWorks = {
  category: string;
  items: {
    title: string;
    slug: string;
    description: string;
    images: {
      src: string;
      alt: string;
    }[];
  }[];
}[];