import { Anchor, Badge, Box, createStyles, Grid, Group, Image, Stack, Text } from '@mantine/core';
import { useIntersection, useWindowEvent } from '@mantine/hooks';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';
import SectionHeader from '../section-header';

const dataTechnologies = [
    "Javascript (ES6+)",
    "TypeScript",
    "React",
    "React Native",
    "Node.js",
    "Next.js",
    "Remix",
    "Python",
    "Bootstrap",
    "Material UI",
    "Tailwind",
    "Mantine",
    "Electron",
    "Java",
    "Android (Java)",
    "PostgreSQL",
    "MongoDB",
]

const dataTools = [
    "Git",
    "Google Analytics",
    "Google Ads",
    "Adobe Photoshop",
    "Adobe XD",
    "WordPress",
    "Obsidian",
    "Android Studio",
]

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

    const technology = dataTechnologies.map((tech, index) => (
        <Badge
            key={index}
            variant="outline"
            color={theme.colorScheme === 'dark' ? 'dark.0' : 'dark.3'}
            size="md"
            mb={"xs"}>{tech}</Badge>
    ));

    const tools = dataTools.map((tech, index) => (
        <Badge
            key={index}
            variant="outline"
            color={theme.colorScheme === 'dark' ? 'dark.0' : 'dark.3'}
            size="md"
            mb={"xs"}>{tech}</Badge>
    ));

    return (
        <div>
            <SectionHeader anchor='about' title={t('about.title')} />

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
                        <span className={classes.techTitle}>{t('about.techTitle')}</span>
                    </Text>
                    <Group spacing={"xs"}>
                        {technology}
                    </Group>
                </Grid.Col>

                <Grid.Col md={6}>
                    <Text size={"lg"} mb={theme.spacing.sm}>
                        <span className={classes.techTitle}>{t('about.toolsTitle')}</span>
                    </Text>
                    <Group spacing={"xs"}>
                        {tools}
                    </Group>
                </Grid.Col>

            </Grid>
        </div>
    )
}

export default AboutSection;