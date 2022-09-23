import { MantineThemeOverride } from '@mantine/core';

const appTheme: MantineThemeOverride = {
  colors: {
    primary: [
      "#9CFCE1",
      "#5BFACD",
      "#25F7BC",
      "#0AE3A6",
      "#09BC8A", // Primary color
      "#06976F",
      "#057959",
      "#036247",
      "#024E39",
      "#013F2E",
    ],
    dark: [
      '#8A99BC', // primary text
      '#435275',
      '#3C4968',
      '#34405B',
      '#2D374E',
      '#252D41',
      '#1E2434',
      '#171c28', // Primary background
      '#0F121A',
      '#07090D',
    ],
  },
  fontFamily: 'roboto, arial, sans-serif',
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
  },
  white: '#F2F4F8',
  black: '#1A1A1A',
  primaryColor: 'primary',
  primaryShade: 4,
  defaultRadius: "md",
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
  },
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  }
};

export default appTheme;