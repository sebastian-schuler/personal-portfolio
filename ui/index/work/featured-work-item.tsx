import { ActionIcon, Box, Card, createStyles, Group, Image, SimpleGrid, Space, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandGithub, IconExternalLink, IconFileDescription } from '@tabler/icons';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import { toLink } from '../../../lib/util';

const useStyles = createStyles((theme) => ({

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
    },

    body: {
        padding: theme.spacing.lg,
        display: 'flex',
        flexDirection: 'column',
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: 32,
        lineHeight: 1.2,
        transition: 'color 0.2s ease',
        marginLeft: -1,

        '&:hover': {
            textDecoration: 'underline',
        }
    },

    tag: {
        fontFamily: 'monospace, monospace',
        lineHeight: 1,
        fontSize: theme.fontSizes.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[4],
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
    placement: "left" | "right"
    externalUrl?: string
    githubUrl?: string
}

const FeaturedWorkItem: React.FC<Props> = ({ slug, title, excerpt, tags, placement, externalUrl, githubUrl }: Props) => {

    const { t } = useTranslation('index');
    const { classes, theme } = useStyles();
    const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const isLeft = placement === "left" || smallScreen;
    const internalUrl = toLink('projects', slug)

    const image = (
        <Image src={'images/projects/thumbnails/marketing-akademie-thumbnail.png'} height={350} fit="cover" />
    )

    return (
        <Card radius="md" shadow={'sm'} p={0} className={classes.card}>
            <SimpleGrid cols={smallScreen ? 1 : 2} spacing={0}>
                {
                    (placement === "left" || smallScreen) && image
                }
                <Box className={classes.body} sx={{ textAlign: isLeft ? 'left' : 'right' }}>
                    <Text transform="uppercase" color="primary" weight={700} size="sm">
                        {t('work.toplineFeatured')}
                    </Text>
                    <Stack>
                        <Link href={internalUrl}>
                            <Text className={classes.title} mt="xs">
                                {title}
                            </Text>
                        </Link >
                        <Text className={classes.tag}>
                            {
                                tags.join(', ')
                            }
                        </Text>
                        <Text>
                            {excerpt}
                        </Text>
                    </Stack>
                    <Space sx={{ flexGrow: 1 }} />
                    <Group sx={{ justifyContent: isLeft ? "flex-start" : "flex-end", paddingTop: theme.spacing.sm }}>
                        <Link
                            href={internalUrl}
                            title={t('work.internalLinkTitle', { title: title })}
                        >
                            <ActionIcon size={'xl'} variant='outline' color={'primary'} className={classes.linkButton}>
                                <IconFileDescription size={24} />
                            </ActionIcon>
                        </Link>
                        {
                            externalUrl && (
                                <Link
                                    href={externalUrl}
                                    title={t('work.externalLinkTitle', { title: title })}
                                >
                                    <ActionIcon size={'xl'} variant='outline' color={'primary'} className={classes.linkButton}>
                                        <IconExternalLink size={24} />
                                    </ActionIcon>
                                </Link>
                            )
                        }
                        {
                            githubUrl && (
                                <Link
                                    href={githubUrl}
                                    title={t('work.githubLinkTitle', { title: title })}
                                >
                                    <ActionIcon size={'xl'} variant='outline' color={'primary'} className={classes.linkButton}>
                                        <IconBrandGithub size={24} />
                                    </ActionIcon>
                                </Link>
                            )
                        }
                    </Group>
                </Box>
                {
                    (placement === "right" && !smallScreen) && image
                }
            </SimpleGrid>
        </Card >
    );
}

export default FeaturedWorkItem