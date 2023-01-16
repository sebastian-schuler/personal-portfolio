import { ActionIcon, Badge, Box, Card, createStyles, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconFileDescription } from '@tabler/icons';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react'
import { PostType } from '../../../interfaces/post';
import { toLink } from '../../../lib/util';
import DateFormatter from '../../date-formatter';

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

    cardFooter: {
        paddingLeft: theme.spacing.lg,
        paddingRight: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
        paddingTop: theme.spacing.md,
    },

    linkButton: {
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'scale(1.1)',
            color: theme.colors.primary[4],
            borderColor: theme.colors.primary[4]
        },
    },

    details: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? 'white' : theme.black,
    }

}));

interface Props {
    slug: string
    title: string
    date: string
    excerpt: string
    tags: string[]
    githubUrl?: string
    externalUrl?: string
    readTime: number
    locales: string[]
}

const OtherWorkItem = ({ slug, title, date, excerpt, tags, githubUrl, externalUrl, readTime, locales }: Props) => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation('index');
    const internalUrl = toLink('blog', slug);

    const tagList = tags.map((tag, i) => (
        <Badge
            variant='outline'
            key={i + 'text'}
            color={'primary.4'}
            size={'md'}
            radius={'md'}
        >{tag}</Badge>
    ));

    const localeStrings = locales.map(locale => t(`common:locale.${locale}`));

    return (
        <Card radius="md" shadow={'sm'} p={0} className={classes.card}>
            <Stack className={classes.cardContent}>
                <Group spacing={'sm'}>
                    {tagList}
                </Group>

                <Link
                    href={internalUrl}
                    title={t('work.internalLinkTitle', { title: title })}
                >
                    <Title order={3} weight={500} className={classes.title}>{title}</Title>
                </Link>

                <Group noWrap spacing="sm" className={classes.details}>
                    <DateFormatter dateString={date} />
                    <Text>•</Text>
                    <Text>{readTime} {t("common:post.readTimeLabel")}</Text>
                    <Text>•</Text>
                    {localeStrings.join(', ')}
                </Group>

                <Text>{excerpt}</Text>
            </Stack>

            <Divider />

            <Box className={classes.cardFooter}>
                <Group>
                    <Link
                        href={internalUrl}
                        title={t('work.internalLinkTitle', { title: title })}
                    >
                        <ActionIcon size={'lg'} variant='outline' className={classes.linkButton}>
                            <IconFileDescription size={24} />
                        </ActionIcon>
                    </Link>
                    {
                        githubUrl &&
                        <Link
                            href={githubUrl}
                            title={t('work.githubLinkTitle', { title: title })}
                        >
                            <ActionIcon size={'lg'} variant='outline' className={classes.linkButton}>
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
                            <ActionIcon size={'lg'} variant='outline' className={classes.linkButton}>
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