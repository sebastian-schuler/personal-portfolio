import { Grid, Stack, Text } from '@mantine/core'
import { useTranslation } from 'next-i18next';
import React from 'react'
import SectionHeader from '../features/SectionHeader'

const AboutSection = () => {

    const { t } = useTranslation(['common', 'index']);

    return (
        <>
            <SectionHeader anchor='about' title={t('mniAbout')} order={0} />

            <Grid>

                <Grid.Col md={7}>

                    <Stack>
                        <Text>{t('aboutParagraph1', { ns: 'index' })}</Text>
                        <Text>{t('aboutParagraph2', { ns: 'index' })}</Text>
                        <Text>{t('aboutParagraph3', { ns: 'index' })}</Text>
                    </Stack>

                </Grid.Col>

                <Grid.Col md={5}>


                </Grid.Col>

            </Grid>
        </>
    )
}

export default AboutSection