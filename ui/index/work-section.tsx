import { Box, createStyles, SimpleGrid, Space, Stack, Text, Title } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import FeaturedWorkItem from './work/featured-work-item'
import SectionHeader from '../section-header'
import OtherWorkItem from './work/other-work-item';
import { Post } from '../../interfaces/post';

const useStyles = createStyles((theme) => ({

    otherProjectsTitle: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 600,
        textAlign: 'center',
    },

    otherProjectsSub: {
        textAlign: 'center',
    },

}));

interface FeaturedWorkItem {
    topline: string
    title: string
    url: string
    paragraph: string
    tags: string[]
    githubUrl?: string
    externalUrl?: string
}

interface Props {
    featuredProjects: Post[]
    otherProjects: Post[]
}

const WorkSection = ({ featuredProjects, otherProjects }: Props) => {

    const { t } = useTranslation('index');
    const { classes, theme } = useStyles();

    return (
        <Box mb={"xl"}>
            <SectionHeader anchor='work' title='Work' subtext='Check out my featured projects below.' />

            <Stack spacing={"lg"} mb={"xl"}>
                {
                    featuredProjects.map((item, index) => (
                        item.type === "project" ?
                            <FeaturedWorkItem
                                key={item.title + index}
                                title={item.title}
                                slug={item.slug}
                                excerpt={item.excerpt}
                                tags={item.tags}
                                placement={index % 2 === 0 ? 'left' : 'right'}
                                githubUrl={item.githubUrl}
                                externalUrl={item.externalUrl}
                            /> : null
                    ))
                }
            </Stack>

            <Title order={3} className={classes.otherProjectsTitle}>Other Projects</Title>
            <Text className={classes.otherProjectsSub} size={'lg'}>Scroll down or open the archive to see all of my projects in chronological order.</Text>

            <Space h={'lg'} />

            <SimpleGrid
                breakpoints={[
                    { minWidth: 'md', cols: 3, spacing: 'md' },
                    { minWidth: 'sm', cols: 2, spacing: 'sm' },
                    { minWidth: 'xs', cols: 1, spacing: 'sm' },
                ]}
            >
                {
                    otherProjects.map((item, index) => (
                        item.type === "project" ?
                            <OtherWorkItem
                                key={item.title + index}
                                title={item.title}
                                slug={item.slug}
                                excerpt={item.excerpt}
                                tags={item.tags}
                                githubUrl={item.githubUrl}
                                externalUrl={item.externalUrl}
                            /> : null
                    ))
                }
            </SimpleGrid>

        </Box>
    )
}

export default WorkSection