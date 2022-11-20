import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { setCookie, getCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { COLOR_SCHEME_COOKIE } from '../lib/constants'
import '../styles/globals.css'
import appTheme from '../styles/theme'
import PageShell from '../ui/nav/page-shell'
import PageFooter from '../ui/page-footer'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {

  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie(COLOR_SCHEME_COOKIE, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...appTheme, colorScheme }}
      >
        <PageShell>
          <Component {...pageProps} />
        </PageShell>
        <PageFooter />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie(COLOR_SCHEME_COOKIE, ctx) || 'dark',
});