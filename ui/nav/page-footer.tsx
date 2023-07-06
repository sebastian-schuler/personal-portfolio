import { ActionIcon, Box, Container, createStyles, Group, Text } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import useTranslation from 'next-translate/useTranslation';
import { SOCIAL_LINKS } from '../../lib/constants';
import ILink from '../link';

const useStyles = createStyles((theme) => {
    return {
        footer: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'white',
        },
        bottom: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
        },
        link: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[7],
            transition: 'color 100ms ease',
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
            <Box pt={theme.spacing.xl} pb={theme.spacing.xl} className={classes.footer}>
                <Container>

                    <Group position='apart' px={0}>

                        <ILink
                            href={'/legal-notice'}
                            type='internal'
                            className={classes.link}
                        >
                            {t('footer.legalNotice')}
                        </ILink>

                        <Group spacing={0} align={'start'} sx={{ flexDirection: 'row-reverse' }}>
                            <ActionIcon
                                component='a'
                                href={SOCIAL_LINKS.twitter.url}
                                target={'_blank'}
                                variant='subtle'
                                size={'lg'}
                                title={t('footer.twitterLinkTitle')}
                                className={classes.link}
                            >
                                <IconBrandTwitter size={24} />
                            </ActionIcon>
                            <ActionIcon
                                component='a'
                                href={SOCIAL_LINKS.linkedin.url}
                                target={'_blank'}
                                variant='subtle'
                                size={'lg'}
                                title={t('footer.linkedinLinkTitle')}
                                className={classes.link}
                            >
                                <IconBrandLinkedin size={24} />
                            </ActionIcon>
                            <ActionIcon
                                component='a'
                                href={SOCIAL_LINKS.github.url}
                                target={'_blank'}
                                variant='subtle'
                                size={'lg'}
                                title={t('footer.githubLinkTitle')}
                                className={classes.link}
                            >
                                <IconBrandGithub size={24} />
                            </ActionIcon>
                        </Group>

                    </Group>

                </Container>
            </Box>

            <Box pt={theme.spacing.md} pb={theme.spacing.md} className={classes.bottom}>
                <Text
                    align='center'
                    size={'sm'}
                    color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[6]}
                >Designed & built by Sebastian Schuler</Text>
            </Box>
        </footer>
    )
}

export default PageFooter;