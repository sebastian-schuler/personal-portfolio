import { ActionIcon, Box, createStyles, getStylesRef, Group, Paper, Stack, Text } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconFileDescription } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const useStyles = createStyles((theme, _params) => ({
    card: {
        position: 'relative',
        height: 440,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'all 0.2s ease-in-out',
        background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(30,36,52,0.8) 100%)',

        [`&:hover .${getStylesRef('overlay')}`]: {
            opacity: 1,
        },
    },

    title: {
        fontFamily: `Greycliff CF ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,

        [`&:hover .${getStylesRef('overlay')}`]: {
            opacity: 1,
        },
    },

    description: {
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.fn.lighten(theme.colors.dark[0], 0.6),
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },

    overlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
        transition: '.5s ease',
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[5], 0.8) : theme.fn.rgba(theme.colors.dark[1], 0.8),
        borderRadius: theme.radius.md,

        ref: getStylesRef('overlay'),
    },

    image: {
        zIndex: -50, 
        borderRadius: theme.radius.md,
        objectFit: 'cover',
    }
}));

interface Props {
    slug: string
    title: string
    description: string
    image: string
    appUrl?: string
    githubUrl?: string
}

const PortfolioPreview: React.FC<Props> = ({ slug, title, description, image, appUrl, githubUrl }: Props) => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation();

    return (
        <motion.div
            layout
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: .5 }}
        >
            <Paper
                shadow="md"
                p="lg"
                radius="md"
                className={classes.card}
            >
                <Image
                    src={image}
                    fill={true}
                    alt={title}
                    sizes={`(max-width: ${theme.breakpoints.md}) 100vw, (max-width: ${theme.breakpoints.lg}) 50vw, 33vw`}
                    className={classes.image}
                />
                <Text className={classes.title}>{title}</Text>
                <Box p={'lg'} className={classes.overlay}>
                    <Stack>
                        <Text className={classes.title}>{title}</Text>
                        <Text className={classes.description}>{description}</Text>
                    </Stack>

                    <Group>
                        <Link href={`/portfolio/${slug}`}>
                            <ActionIcon title={t('common:post.internalLinkTitle', { title: title })} color={'primary'} size={'xl'} variant='outline'>
                                <IconFileDescription size={24} />
                            </ActionIcon>
                        </Link>

                        {appUrl &&
                            <ActionIcon component='a' href={appUrl} target={'_blank'} title={t('common:post.externalLinkTitle', { title: title })} color={'primary'} size={'xl'} variant='outline' >
                                <IconExternalLink size={24} />
                            </ActionIcon>
                        }
                        {githubUrl &&
                            <ActionIcon component='a' href={githubUrl} target={'_blank'} title={t('common:post.githubLinkTitle', { title: title })} color={'primary'} size={'xl'} variant='outline' >
                                <IconBrandGithub size={24} />
                            </ActionIcon>
                        }
                    </Group>

                </Box>
            </Paper>
        </motion.div>
    )
}

export default PortfolioPreview