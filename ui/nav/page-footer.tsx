import { ActionIcon, Box, Container, createStyles, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons';
import useTranslation from 'next-translate/useTranslation';
import ILink from '../link';

const useStyles = createStyles((theme) => {
    return {
        footer: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'white',
        },
        text: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        },
        icon: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[6],
            transition: 'color 200ms ease',

            '&:hover': {
                color: theme.colors.primary[4],
            },
        }
    };
});

const PageFooter = () => {

    const { t } = useTranslation('common');
    const { classes, theme } = useStyles();

    return (
        <footer>
            <Box pt={theme.spacing.lg} pb={theme.spacing.lg} className={classes.footer}>
                <Container>
                    <SimpleGrid cols={3}>

                        <Stack spacing={0}>
                            <ILink url={'/privacy-policy'} type='internal'>{t('footer.privacyPolicy')}</ILink>
                            <ILink url={'/legal-notice'} type='internal'>{t('footer.legalNotice')}</ILink>
                        </Stack>

                        <Text align='center' className={classes.text}>Designed & built by Sebastian Schuler </Text>

                        <Group spacing={0} align={'start'} sx={{ flexDirection: 'row-reverse' }}>
                            <ActionIcon
                                component='a'
                                href='https://twitter.com/sebschuler'
                                variant='subtle'
                                size={'lg'}
                                title={t('footer.twitterLinkTitle')}
                                className={classes.icon}
                            >
                                <IconBrandTwitter size={24} />
                            </ActionIcon>
                            <ActionIcon
                                component='a'
                                href='https://www.linkedin.com/in/sebastian-schuler-8a1b8022b/'
                                variant='subtle'
                                size={'lg'}
                                title={t('footer.linkedinLinkTitle')}
                                className={classes.icon}
                            >
                                <IconBrandLinkedin size={24} />
                            </ActionIcon>
                            <ActionIcon
                                component='a'
                                href='https://github.com/mildlyadequate'
                                variant='subtle'
                                size={'lg'}
                                title={t('footer.githubLinkTitle')}
                                className={classes.icon}
                            >
                                <IconBrandGithub size={24} />
                            </ActionIcon>
                        </Group>

                    </SimpleGrid>
                </Container>
            </Box>
        </footer>
    )
}

export default PageFooter;