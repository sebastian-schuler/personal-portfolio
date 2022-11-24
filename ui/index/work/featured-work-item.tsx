import { ActionIcon, Anchor, createStyles, Group, Image, Paper, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandGithub, IconExternalLink, IconFileDescription } from '@tabler/icons';
import Link from 'next/link';
import React from 'react';

const useStyles = createStyles((theme) => ({

    outerWrapper: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: theme.spacing.md,
        alignItems: 'center',

        boxShadow: theme.shadows.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.primary[4],
        borderRadius: theme.radius.md,
    },

    contentLeft: {
        position: 'relative',
        gridArea: '1 / 1 / -1 / 8',
        paddingLeft: theme.spacing.lg,
        textAlign: 'left',
        zIndex: 5,

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            gridColumn: '1 / -1',
            flexDirection: 'column',
            height: '100%',
            display: 'flex',
            paddingRight: theme.spacing.lg,
            paddingLeft: theme.spacing.lg,
            justifyContent: 'center',
        },
    },

    contentRight: {
        position: 'relative',
        gridArea: '1 / 6 / -1 / -1',
        paddingRight: theme.spacing.lg,
        textAlign: 'right',
        zIndex: 5,

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            gridColumn: '1 / -1',
            flexDirection: 'column',
            height: '100%',
            display: 'flex',
            paddingRight: theme.spacing.lg,
            paddingLeft: theme.spacing.lg,
            justifyContent: 'center',
            textAlign: 'left',
        },
    },

    topline: {
        color: theme.colorScheme === 'dark' ? theme.colors.primary[4] : theme.white,
    },

    title: {
        color: theme.white,
        fontSize: 32,
        lineHeight: 1,
        transition: 'color 0.2s ease',

        '&:hover': {
            textDecoration: 'underline',
        }
    },

    paragraphBox: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.dark[4],
        padding: theme.spacing.md,
        marginTop: theme.spacing.md,
        boxShadow: theme.shadows.sm,
    },

    paragraphText: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,
    },

    tags: {
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },

    tag: {
        paddingRight: theme.spacing.sm,
        fontFamily: 'monospace, monospace',
        lineHeight: 1,
        fontSize: theme.fontSizes.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,
    },

    imageWrapperRight: {
        position: 'relative',
        gridArea: '1 / 6 / -1 / -1',
        zIndex: 1,
        borderRadius: theme.radius.md,

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            gridColumn: '1 / -1',
            height: '100%',
            opacity: 0.1,
        },
    },

    imageWrapperLeft: {
        position: 'relative',
        gridArea: '1 / 1 / -1 / 8',
        zIndex: 1,
        borderRadius: theme.radius.md,

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            gridColumn: '1 / -1',
            height: '100%',
            opacity: 0.1,
        },
    },

    image: {
        borderRadius: theme.radius.md,
    },

    linkButton: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.dark[4],
        transition: 'all 0.2s ease',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.dark[2],
            transform: 'translateY(-0.3rem)',
        },
    }

}));

interface Props {
    topline: string
    url: string
    title: string
    paragraph: string
    tags: string[]
    contentPlacement: "left" | "right"
    externalUrl?: string
    githubUrl?: string
}

const FeaturedWorkItem: React.FC<Props> = ({ topline, url, title, paragraph, tags, contentPlacement, externalUrl, githubUrl }: Props) => {

    const { classes, theme } = useStyles();
    const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

    return (
        <div className={classes.outerWrapper}>

            <div className={contentPlacement === "left" ? classes.contentLeft : classes.contentRight}>

                <Text className={classes.topline}>{topline}</Text>

                <Link href={url}>
                    <Text className={classes.title}>
                        {title}
                    </Text >
                </Link >

                <Paper className={classes.paragraphBox}>
                    <Text className={classes.paragraphText} lineClamp={3}>
                        {paragraph}
                    </Text>
                </Paper>

                <Group
                    spacing={"xs"}
                    className={classes.tags}
                    sx={{ justifyContent: contentPlacement === "left" || smallScreen ? "flex-start" : "flex-end" }}
                >
                    {
                        tags.map((tag, i) => (
                            <Text key={tag + i} className={classes.tag}>{tag}</Text>
                        ))
                    }
                </Group>

                <Group sx={{ justifyContent: contentPlacement === "left" || smallScreen ? "flex-start" : "flex-end" }}>
                    <Link href={url}>
                        <ActionIcon size={'lg'} variant='light' className={classes.linkButton}>
                            <IconFileDescription size={24} />
                        </ActionIcon>
                    </Link>

                    {
                        externalUrl && (
                            <Link href={externalUrl}>
                                <ActionIcon size={'lg'} variant='light' className={classes.linkButton}>
                                    <IconExternalLink size={24} />
                                </ActionIcon>
                            </Link>
                        )
                    }
                    {
                        githubUrl && (
                            <Link href={githubUrl}>
                                <ActionIcon size={'lg'} variant='light' className={classes.linkButton}>
                                    <IconBrandGithub size={24} />
                                </ActionIcon>
                            </Link>
                        )
                    }

                </Group>

            </div>

            <div className={contentPlacement === "left" ? classes.imageWrapperRight : classes.imageWrapperLeft}>

                <Image
                    src='images/projects/thumbnails/marketing-akademie-thumbnail.png'
                    fit="cover"
                    className={classes.image}
                    sx={{ borderRadius: theme.radius.md }}
                    styles={(theme) => ({
                        image: {
                            borderTopRightRadius: contentPlacement === "left" || smallScreen ? theme.radius.md : 0,
                            borderBottomRightRadius: contentPlacement === "left" || smallScreen ? theme.radius.md : 0,
                            borderTopLeftRadius: contentPlacement === "right" || smallScreen ? theme.radius.md : 0,
                            borderBottomLeftRadius: contentPlacement === "right" || smallScreen ? theme.radius.md : 0,
                        },
                    })}
                />

            </div>
        </div>
    )
}

export default FeaturedWorkItem