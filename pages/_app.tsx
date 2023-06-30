import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { setCookie, getCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'
import useTranslation from 'next-translate/useTranslation'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { COLOR_SCHEME_COOKIE } from '../lib/constants'
import { CustomFonts } from '../styles/customFonts'
import '../styles/globals.css'
import appTheme from '../styles/theme'
import PageShell from '../ui/nav/page-shell'
import PageFooter from '../ui/nav/page-footer'
import App from 'next/app'

export default function MyApp(props: AppProps & { colorScheme: ColorScheme }) {

  const { Component, pageProps } = props;
  const { t } = useTranslation('common');

  const [activeColorScheme, setActiveColorScheme] = useState<ColorScheme>(props.colorScheme || 'dark');

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (activeColorScheme === 'dark' ? 'light' : 'dark');
    setActiveColorScheme(nextColorScheme);
    setCookie(COLOR_SCHEME_COOKIE, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
  };

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
          <PageShell>
            <Component {...pageProps} />
          </PageShell>
          <PageFooter />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {

//   const appProps = await App.getInitialProps(appContext)

//   const cookie = getCookie(COLOR_SCHEME_COOKIE, appContext.ctx);

//   const props:AppInitialProps = {
//     ...appProps,
//     pageProps: {
//       colorScheme: cookie,
//     }
//   }

//   return props;
// }