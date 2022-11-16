import { Box, createStyles, Grid, Image, List, SimpleGrid, Space, Stack, Text } from '@mantine/core'
import { IconAbacus, IconChevronRight } from '@tabler/icons';
import { useTranslation } from 'next-i18next';
import React from 'react'
import ILink from '../link';
import SectionHeader from '../section-header'

const useStyles = createStyles((theme) => ({

    image: {
        mixBlendMode: 'multiply',
    },

    imageWrapper: {
        backgroundColor: theme.colors.primary[1],
        mixBlendMode: 'screen',
        borderRadius: theme.radius.md,
        transition: 'all 0.8s ease',

        '&:hover': {
            backgroundColor: 'transparent',
        }
    },

    outerImageWrapper: {
        backgroundColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.dark[4],
        borderRadius: theme.radius.md,
    },

    techTitle: {
        fontWeight: 600,
        color: theme.colors.primary[4],
    }

}));

const AboutSection = () => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation(['common', 'index']);

    return (
        <Box mb={"xl"}>
            <SectionHeader anchor='about' title={t('menu.about')} order={0} />

            <Grid gutter={theme.spacing.lg}>

                <Grid.Col sm={6} md={7}>

                    <Stack>
                        <Text align='justify'>{t('about.p1', { ns: 'index' })}</Text>
                        <Text align='justify'>{t('about.p2', { ns: 'index' })}</Text>
                        <Text align='justify'>
                            {t('about.p3.1', { ns: 'index' })} {' '}
                            <ILink label={t('menu.experience')} url='#experience' type='scroll' /> {' '}
                            {t('about.p3.2', { ns: 'index' })} {' '}
                            <ILink label={t('menu.work')} url='#work' type='scroll' /> {' '}
                            {t('about.p3.3', { ns: 'index' })}
                        </Text>
                    </Stack>

                </Grid.Col>

                <Grid.Col sm={6} md={5}>

                    <div className={classes.outerImageWrapper}>
                        <div className={classes.imageWrapper}>
                            <Image
                                src='images/index/me_france.jpg'
                                fit="contain"
                                className={classes.image}
                                radius="md"
                            />
                        </div>
                    </div>

                </Grid.Col>

                <Grid.Col md={6}>
                    <Text size={"lg"} mb={theme.spacing.sm}>
                        <span className={classes.techTitle}>{t('about.tech.title', { ns: 'index' })}</span> {' '}
                        {t('about.tech.text', { ns: 'index' })}
                    </Text>
                    <SimpleGrid cols={2}>
                        <List size="md" icon={<IconChevronRight size={22} />}>
                            <List.Item>Javascript (ES6+)</List.Item>
                            <List.Item>React</List.Item>
                            <List.Item>Node.js</List.Item>
                            <List.Item>Python</List.Item>
                            <List.Item>Bootstrap</List.Item>
                        </List>
                        <List size="md" icon={<IconChevronRight size={22} />}>
                            <List.Item>TypeScript</List.Item>
                            <List.Item>Remix</List.Item>
                            <List.Item>Electron</List.Item>
                            <List.Item>Java / Android</List.Item>
                            <List.Item>Tailwind</List.Item>
                        </List>
                    </SimpleGrid>
                </Grid.Col>

                <Grid.Col md={6}>
                    <Text size={"lg"} mb={theme.spacing.sm}>
                        <span className={classes.techTitle}>{t('about.tools.title', { ns: 'index' })}</span> {' '}
                        {t('about.tools.text', { ns: 'index' })}
                    </Text>
                    <SimpleGrid cols={2}>
                        <List size="md" icon={<IconChevronRight size={22} />}>
                            <List.Item>Google Analytics</List.Item>
                            <List.Item>Adobe Photoshop</List.Item>
                            <List.Item>Git</List.Item>
                        </List>
                        <List size="md" icon={<IconChevronRight size={22} />}>
                            <List.Item>Google Ads</List.Item>
                            <List.Item>Adobe XD</List.Item>
                            <List.Item>WordPress</List.Item>
                        </List>
                    </SimpleGrid>
                </Grid.Col>

            </Grid>
        </Box>
    )
}

export default AboutSection