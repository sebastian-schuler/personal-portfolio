import { Box, Button, Center, createStyles, Stack, Text, Title } from '@mantine/core'
import { useTranslation } from 'next-i18next';
import React from 'react'
import ReactTypingEffect from "react-typing-effect";
import { HEADER_HEIGHT, HEADER_MOBILE_HEIGHT } from '../Nav';

const useStyles = createStyles((theme) => ({

    outer: {

        [theme.fn.smallerThan('sm')]: {
            height: `calc(100vh - ${HEADER_MOBILE_HEIGHT}px)`,
        },

        [theme.fn.largerThan('sm')]: {
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        },
    },

    title: {
        lineHeight: 1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: 'clamp(2.5rem, 7vw, 5rem)',
        marginLeft: '-2px',
        marginBottom: theme.spacing.lg,
    },

    typewriterOuterText: {
        lineHeight: 1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 600,
        fontSize: 'clamp(1.4rem, 5vw, 2.2rem)',
    },

    typewriterText: {
        color: theme.colors.primary[4],
    },

    subText: {
        fontSize: theme.fontSizes.lg,
        marginBottom: theme.spacing.lg,
    },

}));

const HeroSection = () => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation('index');
    const typingContent = t('hero.typewriterArray', { returnObjects: true });

    return (
        <Box className={classes.outer}>

            <Center sx={{ height: "100%" }}>
                <Stack spacing={0} sx={{ width: "100%" }}>
                    <Text size={20} color={'primary'}>{t('hero.greeting')}</Text>
                    <Title order={1} className={classes.title}>Sebastian Schuler</Title>
                    <Text className={classes.typewriterOuterText}>
                        {t('hero.preTypewriter')}
                        <ReactTypingEffect
                            className={classes.typewriterText}
                            text={typingContent}
                            typingDelay={700}
                            eraseDelay={1200}
                            eraseSpeed={100}
                            speed={250}
                        />
                    </Text>
                    <Text className={classes.subText}>{t('hero.subtext')}</Text>
                    <Box pb={100}>
                        <Button component='a' href='#about' variant='outline' size='md'>{t('hero.learnMoreButton')}</Button>
                    </Box>
                </Stack>
            </Center>

        </Box>
    )
}

export default HeroSection