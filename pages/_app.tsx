import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import GlobalContextProvider from '../lib/AppContext'
import '../styles/globals.css'
import appTheme from '../styles/theme'
import PageShell from '../ui/Shell'

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...appTheme, colorScheme }}
      >
        <GlobalContextProvider>
          <PageShell>
            <Component {...pageProps} />
          </PageShell>
        </GlobalContextProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default appWithTranslation(MyApp);
