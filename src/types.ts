export type TWork = {
  title: string;
  slug: string;
  category?: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
};

export type TWorks = {
  category: string;
  items: TWork[]
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
  desktop: {
    workNavWidth: number;
    margin: number;
    headerHeight: number;
  };
  mobile: {
    headerHeight: number;
    margin: number;
  }
};

type TBreakpoints = {
  small: number;
  medium: number;
  large: number;
  xLarge: number;
};

export type TStyles = {
  type: TFontTypes;
  colors: TColors;
  measurements: TMeasurements;
  breakpoints: TBreakpoints;
};
