import { ActionIcon, Anchor, Box, Button, createStyles, getStylesRef, Group, Paper, Stack, Text } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconFileDescription, IconLink, IconX } from '@tabler/icons-react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
        background: 'linear-gradient(to top, #3204fd00, #9907facc)',

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
    }
}));

interface Props {
    slug: string
    title: string
    description: string
    image: string
    appUrl: string | null
    githubUrl: string | null
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
                sx={{ backgroundImage: `url(${image})` }}
                className={classes.card}
            >
                <Text className={classes.title}>{title}</Text>
                <Box p={'lg'} className={classes.overlay}>
                    <Stack>
                        <Text className={classes.title}>{title}</Text>
                        <Text className={classes.description}>{description}</Text>
                    </Stack>

                    <Group>
                        <ActionIcon component={Link} href={`/portfolio/${slug}`} title={t('common:post.internalLinkTitle', { title: title })} color={'primary'} size={'xl'} variant='outline' legacyBehavior>
                            <IconFileDescription size={24} />
                        </ActionIcon>

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