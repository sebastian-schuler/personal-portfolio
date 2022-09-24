import { ActionIcon, Anchor, createStyles, Group, Image, Paper, Text } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconFileDescription } from '@tabler/icons';
import Link from 'next/link';
import React from 'react';

const useStyles = createStyles((theme) => ({

    outerWrapper: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 10,
        alignItems: 'center',
        marginBottom: 80,

        boxShadow: theme.shadows.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        borderRadius: theme.radius.md,
    },

    contentLeft: {
        position: 'relative',
        gridArea: '1 / 1 / -1 / 8',
        paddingLeft: theme.spacing.lg,
        textAlign: 'left',
        zIndex: 5,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
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

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            gridColumn: '1 / -1',
            flexDirection: 'column',
            height: '100%',
            display: 'flex',
            paddingRight: theme.spacing.lg,
            paddingLeft: theme.spacing.lg,
            justifyContent: 'center',
        },
    },

    topline: {
        color: theme.colors.primary[4],
        marginBottom: theme.spacing.xs,
    },

    title: {
        color: theme.white,
        fontSize: 32,
        lineHeight: 1,
    },

    paragraphBox: {
        backgroundColor: theme.colors.dark[6],
        padding: theme.spacing.md,
        marginTop: theme.spacing.xs,
        boxShadow: theme.shadows.sm,
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
    },

    imageWrapperRight: {
        position: 'relative',
        gridArea: '1 / 6 / -1 / -1',
        zIndex: 1,
        opacity: 0.8,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            gridColumn: '1 / -1',
            height: '100%',
            opacity: 0.1,
        },
    },

    imageWrapperLeft: {
        position: 'relative',
        gridArea: '1 / 1 / -1 / 8',
        zIndex: 1,
        opacity: 0.8,
        borderRadius: theme.radius.md,
    },

    image: {
        // backgroundColor: theme.white,
        // opacity: 0.8,
        borderRadius: theme.radius.md,

        '&:hover': {
            // opacity: 1,
        },
    },

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

    return (
        <div className={classes.outerWrapper}>

            <div className={contentPlacement === "left" ? classes.contentLeft : classes.contentRight}>

                <Text className={classes.topline}>{topline}</Text>

                <Link href={url} passHref>
                    <Anchor component="a" className={classes.title}>
                        {title}
                    </Anchor >
                </Link >

                <Paper className={classes.paragraphBox}>
                    <Text>
                        {paragraph}
                    </Text>
                </Paper>

                <Group
                    spacing={4}
                    className={classes.tags}
                    sx={{ justifyContent: contentPlacement === "left" ? "flex-start" : "flex-end" }}
                >
                    {
                        tags.map((tag, i) => (
                            <Text key={tag + i} className={classes.tag}>{tag}</Text>
                        ))
                    }
                </Group>

                <Group sx={{ justifyContent: contentPlacement === "left" ? "flex-start" : "flex-end" }}>
                    <Link href={url} passHref>
                        <ActionIcon component="a" size={'lg'} variant='light'>
                            <IconFileDescription size={24} />
                        </ActionIcon>
                    </Link>

                    {
                        externalUrl && (
                            <Link href={externalUrl} passHref>
                                <ActionIcon component="a" size={'lg'} variant='light'>
                                    <IconExternalLink size={24} />
                                </ActionIcon>
                            </Link>
                        )
                    }
                    {
                        githubUrl && (
                            <Link href={githubUrl} passHref>
                                <ActionIcon component="a" size={'lg'} variant='light'>
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
                    fit="contain"
                    className={classes.image}
                    sx={{ borderRadius: theme.radius.md }}
                    styles={(theme) => ({
                        image: {
                            borderTopRightRadius: contentPlacement === "left" ? theme.radius.md : 0,
                            borderBottomRightRadius: contentPlacement === "left" ? theme.radius.md : 0,
                            borderTopLeftRadius: contentPlacement === "left" ? 0 : theme.radius.md,
                            borderBottomLeftRadius: contentPlacement === "left" ? 0 : theme.radius.md,
                        }
                    })}
                />

            </div>

        </div>
    )
}

export default FeaturedWorkItem