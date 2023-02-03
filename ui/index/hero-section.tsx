import { Box, Button, Center, createStyles, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import ReactTypingEffect from "react-typing-effect";
import { HEADER_MOBILE_HEIGHT } from '../nav/page-nav';

const useStyles = createStyles((theme) => ({

    outer: {
        height: `calc(100vh - ${HEADER_MOBILE_HEIGHT}px)`,
    },

    preTitle: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: theme.fontSizes.xl,
    },

    title: {
        lineHeight: 1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: 'clamp(2.5rem, 7vw, 5rem)',
        marginLeft: '-2px',
        marginTop: theme.spacing.md,
    },

    typewriterOuterText: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 600,
        fontSize: 'clamp(1.4rem, 5vw, 2.2rem)',
    },

    typewriterText: {
        color: theme.colors.primary[4],
    },

    subText: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: theme.fontSizes.lg,
        marginBottom: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        maxWidth: 500,
    },

}));

const HeroSection = () => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation('index');
    const typingContent = t('hero.typewriterArray', {}, { returnObjects: true });

    return (
        <Box className={classes.outer}>

            <Center sx={{ height: "100%" }}>
                <Stack spacing={0} sx={{ width: "100%" }}>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5, ease: 'easeIn' }}
                    >
                        <Text className={classes.preTitle}>{t('hero.greeting')}</Text>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5, delay: .1, ease: 'easeIn' }}
                    >
                        <Title order={1} className={classes.title}>Sebastian Schuler</Title>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: .2, ease: 'easeIn' }}
                    >
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5, delay: .3, ease: 'easeIn' }}
                    >
                        <Text className={classes.subText}>{t('hero.subtext')}</Text>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .5, delay: .4, ease: 'easeIn' }}
                    >
                        <Box pb={100}>
                            <Button
                                component='a'
                                href='#about'
                                variant='outline'
                                size='md'
                            >
                                {t('hero.learnMoreButton')}
                            </Button>
                        </Box>
                    </motion.div>

                </Stack>
            </Center>

        </Box>
    )
}

export default HeroSection