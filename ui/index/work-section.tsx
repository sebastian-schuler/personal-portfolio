import { Box, createStyles, Stack, Text, Title } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import React from 'react'
import FeaturedWorkItem from '../featured-work-item'
import SectionHeader from '../section-header'

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

const WorkSection = () => {

    const { t } = useTranslation(['index', 'common']);
    const { classes, theme } = useStyles();

    const featuredItems: FeaturedWorkItem[] = t('featuredWork.items', { returnObjects: true });

    return (
        <Box mb={"xl"}>
            <SectionHeader anchor='work' title='Work' order={2} subtext='Check out my featured projects below.'/>

            <Stack spacing={"lg"} mb={"xl"}>
                {
                    featuredItems.map((item, index) => (

                        <FeaturedWorkItem
                            key={item.title + index}
                            topline={item.topline}
                            title={item.title}
                            url={item.url}
                            paragraph={item.paragraph}
                            tags={item.tags}
                            contentPlacement={index % 2 === 0 ? 'left' : 'right'}
                            githubUrl={item.githubUrl}
                            externalUrl={item.externalUrl}
                        />

                    ))
                }
            </Stack>

            <Title order={3} className={classes.otherProjectsTitle}>Other Projects</Title>
            <Text className={classes.otherProjectsSub} size={'lg'}>Scroll down or open the archive to see all of my projects in chronological order.</Text>

            
        </Box>
    )
}

export default WorkSection