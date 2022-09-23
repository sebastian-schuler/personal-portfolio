import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import appTheme from '../styles/theme'
import PageShell from '../components/layout/Shell/PageShell'
import { useState } from 'react'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{...appTheme, colorScheme}}
      >
        <PageShell>
          <Component {...pageProps} />
        </PageShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default appWithTranslation(MyApp);
