import { ActionIcon, Box, Card, createStyles, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconFileDescription } from '@tabler/icons';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react'
import { toLink } from '../../../lib/util';

const useStyles = createStyles((theme) => ({

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
        display: 'flex',
        flexDirection: 'column',
    },

    cardContent: {
        flexGrow: 1,
        paddingLeft: theme.spacing.lg,
        paddingRight: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
    },

    title: {
        fontSize: theme.fontSizes.xl,

        '&:hover': {
            textDecoration: 'underline',
        }
    },

    tag: {
        fontFamily: 'monospace, monospace',
        lineHeight: 1,
        fontSize: theme.fontSizes.md,
    },

    cardFooter: {
        paddingLeft: theme.spacing.lg,
        paddingRight: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
        paddingTop: theme.spacing.md,
    },

    linkButton: {
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'translateY(-0.3rem)',
        },
    },

}));

interface Props {
    slug: string
    title: string
    excerpt: string
    tags: string[]
    githubUrl?: string
    externalUrl?: string
}

const OtherWorkItem = ({ slug, title, excerpt, tags, githubUrl, externalUrl }: Props) => {

    const { classes } = useStyles();
    const { t } = useTranslation('index');
    const internalUrl = toLink('blog', slug)

    return (
        <Card radius="md" shadow={'sm'} p={0} className={classes.card}>

            <Stack className={classes.cardContent}>
                <Link
                    href={internalUrl}
                    title={t('work.internalLinkTitle', { title: title })}
                >
                    <Title order={3} weight={500} className={classes.title}>{title}</Title>
                </Link>
                <Text className={classes.tag}>{tags.join(', ')}</Text>
                <Text>{excerpt}</Text>
            </Stack>

            <Divider />

            <Box className={classes.cardFooter}>
                <Group>
                    <Link
                        href={internalUrl}
                        title={t('work.internalLinkTitle', { title: title })}
                    >
                        <ActionIcon size={'lg'} variant='outline' color={'primary'} className={classes.linkButton}>
                            <IconFileDescription size={24} />
                        </ActionIcon>
                    </Link>
                    {
                        githubUrl &&
                        <Link
                            href={githubUrl}
                            title={t('work.githubLinkTitle', { title: title })}
                        >
                            <ActionIcon size={'lg'} variant='outline' color={'primary'} className={classes.linkButton}>
                                <IconBrandGithub size={24} />
                            </ActionIcon>
                        </Link>
                    }
                    {
                        externalUrl &&
                        <Link
                            href={externalUrl}
                            title={t('work.externalLinkTitle', { title: title })}
                        >
                            <ActionIcon size={'lg'} variant='outline' color={'primary'} className={classes.linkButton}>
                                <IconExternalLink size={24} />
                            </ActionIcon>
                        </Link>
                    }
                </Group>
            </Box>

        </Card>
    )
}

export default OtherWorkItem;