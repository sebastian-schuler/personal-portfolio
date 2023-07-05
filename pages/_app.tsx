import { ColorScheme, ColorSchemeProvider, MantineProvider, Text } from '@mantine/core'
import { getCookie, setCookie } from 'cookies-next'
import useTranslation from 'next-translate/useTranslation'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { COLOR_SCHEME_COOKIE } from '../lib/constants'
import { CustomFonts } from '../styles/customFonts'
import localFont from 'next/font/local'
import '../styles/globals.css'
import appTheme from '../styles/theme'
import PageFooter from '../ui/nav/page-footer'
import PageShell from '../ui/nav/page-shell'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

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

// TODO: Broken
// MyApp.getInitialProps = async (appContext: AppContext) => {

//   // const appProps = await App.getInitialProps(appContext)

//   const cookie = getCookie(COLOR_SCHEME_COOKIE, appContext.ctx);

//   console.log(cookie);

//   const props: AppInitialProps = {
//     pageProps: {
//       colorScheme: cookie,
//     }
//   }

//   return props;
// }

export default MyApp;