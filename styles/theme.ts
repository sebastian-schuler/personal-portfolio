import { DefaultMantineColor, MantineThemeOverride, Tuple } from '@mantine/core';

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
  },
  components: {
    Title: {
      styles: (theme) => ({
        root: {
          '&:is(h1)': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[8] },
          '&:is(h2)': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[7] },
          '&:is(h3)': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[6] },
          '&:is(h4)': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[6] },
          '&:is(h5)': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5] },
          '&:is(h6)': { color: theme.colors.primary[4] },
        }
      }),
    },
    Container: {
      defaultProps: {
        size: 'lg',
        px: 'lg',
      },
    },
    TypographyStylesProvider: {
      styles: (theme) => ({
        root: {
          '& h1': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5] },
          '& h2': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5] },
          '& h3': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5] },
          '& h4': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5] },
          '& h5': { color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5] },
          '& h6': { color: theme.colors.primary[4] },
        }
      }),
    },
  },
  headings: {
    fontFamily: 'roboto, arial, sans-serif',
    sizes: {
      h1: {
        fontSize: '3em',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2.5em',
        fontWeight: 700,
      },
      h3: {
        fontSize: '2.0em',
        fontWeight: 700,
      },
      h4: {
        fontSize: '1.7em',
        fontWeight: 700,
      },
      h5: {
        fontSize: '1.5em',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1.3em',
        fontWeight: 500,
      },
    }

  }
};

type ExtendedCustomColors = 'primary' | 'dark' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

export default appTheme;