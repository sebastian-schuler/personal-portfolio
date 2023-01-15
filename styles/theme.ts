import { DefaultMantineColor, MantineThemeOverride, Tuple } from '@mantine/core';

const appTheme: MantineThemeOverride = {

  colors: {
    primary: [
      "#9CFCE1",
      "#5BFACD",
      "#25F7BC",
      "#0AE3A6",
      "#09BC8A",
      "#06976F",
      "#057959",
      "#036247",
      "#024E39",
      "#013F2E",
    ],
    themeBlue: [
      "#6BE4FF",
      "#48DEFF",
      "#27D8FF",
      "#0AD3FF",
      "#00C1EC",
      "#00ACD2",
      "#0099BB",
      "#0088A6",
      "#007994",
      "#006C84"
    ],
    themePurple: [
      "#A377BA",
      "#9663B0",
      "#8953A4",
      "#7B4B94",
      "#6D4384",
      "#613B75",
      "#573568",
      "#4D2F5D",
      "#452A53",
      "#3D254A"
    ],
    dark: [
      '#A4B1CB',
      '#435275',
      '#3C4968',
      '#34405B',
      '#2D374E',
      '#252D41',
      '#1E2434',
      '#171c28',
      '#0F121A',
      '#07090D',
    ],
  },
  white: '#F2F4F8',
  black: '#1A1A1A',
  primaryColor: 'primary',
  primaryShade: 4,

  fontFamily: 'roboto, arial, sans-serif',
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 18,
    xl: 20,
  },

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
          '&:is(h1)': {
            color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[8],
            marginLeft: -2,
          },
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
        size: 'md',
        px: 'lg',
      },
    },

    TypographyStylesProvider: {
      styles: (theme) => ({
        root: {
          '& p': {
            marginBottom: theme.spacing.md
          },
          '& h2': {
            color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5],
            marginTop: theme.spacing.lg,
          },
          '& h3': {
            color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5],
            marginTop: theme.spacing.lg,
          },
          '& h4': {
            color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5]
          },
          '& h5': {
            color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5]
          },
          '& h6': {
            fontWeight: 600,
          },
          '& pre': {
            padding: theme.spacing.md,
          },
          '& code': {
            fontSize: theme.fontSizes.sm,
          }
        }
      }),
    },
    Button: {
      styles: (theme,_params) => ({
        root: {
          color: _params.variant === 'filled' ? theme.white : theme.colors.primary[4],
          backgroundColor: _params.variant === 'filled' ? theme.colors.primary[5] : undefined,
        },
      }),
    },
  },

  headings: {
    fontFamily: 'roboto, arial, sans-serif',
    sizes: {
      h1: {
        fontSize: '4em',
        fontWeight: 700,
        lineHeight: 1.1,
      },
      h2: {
        fontSize: '2.5em',
        fontWeight: 700,
        lineHeight: 1.1,
      },
      h3: {
        fontSize: '2.0em',
        fontWeight: 700,
        lineHeight: 1.1,
      },
      h4: {
        fontSize: '1.7em',
        fontWeight: 700,
        lineHeight: 1.1,
      },
      h5: {
        fontSize: '1.5em',
        fontWeight: 600,
        lineHeight: 1.1,
      },
      h6: {
        fontSize: '1.3em',
        fontWeight: 500,
        lineHeight: 1.1,
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