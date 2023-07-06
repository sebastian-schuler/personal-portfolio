import { Anchor, Badge, createStyles, Grid, Group, Stack, Text } from '@mantine/core';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
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
        borderRadius: theme.radius.md,
        objectFit: 'cover',

        width: '100%',
        height: 'auto',
    },

    imageWrapper: {
        position: 'relative',
        height: '350px',

        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.primary[1] : theme.colors.primary[0],
        mixBlendMode: 'screen',
        borderRadius: theme.radius.md,
        transition: 'all 0.8s ease',

        maxWidth: '75%',
        margin: '0 auto',

        '&:hover': {
            backgroundColor: 'transparent',
        },

        [`@media (min-width: ${theme.breakpoints.xs})`]: {
            maxWidth: '50%',
            margin: '0 auto',
        },

        [`@media (min-width: ${theme.breakpoints.sm})`]: {
            maxWidth: 'inherit',
            margin: '0 auto',
        },
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
            variant="light"
            color={theme.colorScheme === 'dark' ? 'dark.0' : 'dark.3'}
            bg={theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]}
            size="md">{tech}</Badge>
    ));

    const tools = dataTools.map((tech, index) => (
        <Badge
            key={index}
            variant="light"
            color={theme.colorScheme === 'dark' ? 'dark.0' : 'dark.3'}
            bg={theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]}
            size="md">{tech}</Badge>
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
                                src='/images/index/me_france.jpg'
                                className={classes.image}
                                fill={true}
                                alt={t('about.imageAlt')}
                                sizes={`(max-width: ${theme.breakpoints.md}) 100vw, (max-width: ${theme.breakpoints.lg}) 50vw, 33vw`}
                            />
                        </div>
                    </div>

                </Grid.Col>

                <Grid.Col md={6}>
                    <Text size={"lg"} mb={theme.spacing.sm}>
                        <span className={classes.techTitle}>{t('about.techTitle')}</span>
                    </Text>
                    <Group spacing={"sm"}>
                        {technology}
                    </Group>
                </Grid.Col>

                <Grid.Col md={6}>
                    <Text size={"lg"} mb={theme.spacing.sm}>
                        <span className={classes.techTitle}>{t('about.toolsTitle')}</span>
                    </Text>
                    <Group spacing={"sm"}>
                        {tools}
                    </Group>
                </Grid.Col>

            </Grid>
        </div>
    )
}

export default AboutSection;