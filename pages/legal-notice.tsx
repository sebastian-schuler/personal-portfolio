import Head from 'next/head'
import React from 'react'
import MyTitle from '../ui/title'
import useTranslation from 'next-translate/useTranslation';
import { Container, Text, useMantineTheme } from '@mantine/core';
import EncryptedEmail from '../ui/contact/encrypted-email';

const LegalNotice = () => {

  const { t } = useTranslation('legal-notice');
  const theme = useMantineTheme();

  return (
    <div>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Container pb={'lg'}>
        <MyTitle marginBottom marginTop>{t("title")}</MyTitle>

        <Text weight={'bold'} color={theme.colorScheme === "dark" ? 'white' : 'black'}>{t('responsibility-header')}</Text>

        <Text>Sebastian Schuler</Text>
        <EncryptedEmail email='sebastian.schuler.sbsc@gmail.com' />
      </Container>

    </div>
  )
}

export default LegalNotice