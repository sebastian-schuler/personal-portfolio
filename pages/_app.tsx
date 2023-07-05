import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { getCookie, setCookie } from 'cookies-next'
import useTranslation from 'next-translate/useTranslation'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import localFont from 'next/font/local'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { COLOR_SCHEME_COOKIE } from '../lib/constants'
import { CustomFonts } from '../styles/customFonts'
import '../styles/globals.css'
import appTheme from '../styles/theme'
import PageFooter from '../ui/nav/page-footer'
import PageShell from '../ui/nav/page-shell'

const logoFont = localFont({ src: '../assets/fonts/Norican-Regular.ttf' })

function MyApp(props: AppProps & { colorScheme: ColorScheme }) {

  const { Component, pageProps } = props;
  const { t } = useTranslation('common');

  const [activeColorScheme, setActiveColorScheme] = useState<ColorScheme>(props.colorScheme || 'dark');

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (activeColorScheme === 'dark' ? 'light' : 'dark');
    setActiveColorScheme(nextColorScheme);
    setCookie(COLOR_SCHEME_COOKIE, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
  };

  useEffect(() => {
    getCookie(COLOR_SCHEME_COOKIE) === 'light' ? setActiveColorScheme('light') : setActiveColorScheme('dark');
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content={t('metaDescription')} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
      </Head>
      <ColorSchemeProvider colorScheme={activeColorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ ...appTheme, colorScheme: activeColorScheme }}
        >
          <CustomFonts />
          <PageShell logoFont={logoFont.className}>
            <Component {...pageProps} />
          </PageShell>
          <PageFooter />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

export default MyApp;