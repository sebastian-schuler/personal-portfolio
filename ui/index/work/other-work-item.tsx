import { ActionIcon, Box, createStyles, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconFileDescription } from '@tabler/icons';
import Link from 'next/link';
import React from 'react'

const useStyles = createStyles((theme) => ({

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
        display: 'flex',
        flexDirection: 'column',
    },

    cardContentWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    cardContent: {
        paddingLeft: theme.spacing.lg,
        paddingRight: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
    },

    title: {
        fontWeight: 500,
        fontSize: theme.fontSizes.xl,

        '&:hover': {
            textDecoration: 'underline',
        }
    },

    text: {
        // marginBottom: theme.spacing.sm,
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
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.dark[4],
        border: 'none',
        transition: 'all 0.2s ease',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.dark[2],
            transform: 'translateY(-0.3rem)',
        }
    }

}));

interface Props {
    title: string
    description: string
    tags: string[]
    internalLink: string
    githubLink?: string
    externalLink?: string
}

const OtherWorkItem = ({ title, description, internalLink, tags, externalLink, githubLink }: Props) => {

    const { classes, theme } = useStyles();

    return (
        <div className={classes.card}>

            <Box className={classes.cardContentWrapper}>
                <Stack className={classes.cardContent}>
                    <Link href={internalLink}>
                        <Title order={3} className={classes.title}>{title}</Title>
                    </Link>
                    <Text className={classes.text}>{description}</Text>
                    <Text className={classes.tag}>{tags.join(', ')}</Text>
                </Stack>
            </Box>

            <Divider />

            <Box className={classes.cardFooter}>
                <Group>
                    <Link href={internalLink}>
                        <ActionIcon size={'lg'} variant='default' className={classes.linkButton}>
                            <IconFileDescription size={24} />
                        </ActionIcon>
                    </Link>
                    {
                        githubLink &&
                        <Link href={githubLink}>
                            <ActionIcon size={'lg'} variant='default' className={classes.linkButton}>
                                <IconBrandGithub size={24} />
                            </ActionIcon>
                        </Link>
                    }
                    {
                        externalLink &&
                        <Link href={externalLink}>
                            <ActionIcon size={'lg'} variant='default' className={classes.linkButton}>
                                <IconExternalLink size={24} />
                            </ActionIcon>
                        </Link>
                    }
                </Group>
            </Box>

        </div>
    )
}

export default OtherWorkItem;