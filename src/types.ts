export type TWorks = {
  category: string;
  items: {
    title: string;
    slug: string;
    category?: string;
    description: string;
    images: {
      src: string;
      alt: string;
    }[];
  }[];
}[];

type TFontTypes = {
  sans: string;
  mono: string;
};

type TColors = {
  black: string;
  white: string;
  active: string;
  offBlack?: string;
};

type TMeasurements = {
  workNavWidth: number;
  desktopMargin: number;
};

export type TStyles = {
  type: TFontTypes;
  colors: TColors;
  measurements: TMeasurements;
};
