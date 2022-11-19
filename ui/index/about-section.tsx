import { Anchor, Box, createStyles, Grid, Image, List, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import ILink from '../link';
import SectionHeader from '../section-header';

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
    const { t } = useTranslation('index');

    return (
        <Box mb={"xl"}>
            <SectionHeader anchor='about' title={t('about.title')} order={0} />

            <Grid gutter={theme.spacing.lg}>

                <Grid.Col sm={6} md={7}>
                    <Stack>
                        <Text align='justify'>{t('about.text.0')}</Text>
                        <Text align='justify'>{t('about.text.1')}</Text>
                        <Text align='justify'>
                            <Trans
                                i18nKey="index:about.text.2"
                                components={[<Anchor href='#experience' />, <Anchor href='#work' />]}
                            />
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
                        <span className={classes.techTitle}>{t('about.tech.title')}</span> {' '} {t('about.tech.text')}
                    </Text>
                    <SimpleGrid cols={2}>
                        <List size="sm" icon={<IconChevronRight size={22} />}>
                            <List.Item>Javascript (ES6+)</List.Item>
                            <List.Item>React</List.Item>
                            <List.Item>Node.js</List.Item>
                            <List.Item>Python</List.Item>
                            <List.Item>Bootstrap</List.Item>
                        </List>
                        <List size="sm" icon={<IconChevronRight size={22} />}>
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
                        <span className={classes.techTitle}>{t('about.tools.title')}</span> {' '} {t('about.tools.text')}
                    </Text>
                    <SimpleGrid cols={2}>
                        <List size="sm" icon={<IconChevronRight size={22} />}>
                            <List.Item>Google Analytics</List.Item>
                            <List.Item>Adobe Photoshop</List.Item>
                            <List.Item>Git</List.Item>
                        </List>
                        <List size="sm" icon={<IconChevronRight size={22} />}>
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

export default AboutSection;