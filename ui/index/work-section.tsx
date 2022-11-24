import { Box, createStyles, SimpleGrid, Space, Stack, Text, Title } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import FeaturedWorkItem from './work/featured-work-item'
import SectionHeader from '../section-header'
import OtherWorkItem from './work/other-work-item';

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

    const { t } = useTranslation('index');
    const { classes, theme } = useStyles();

    const featuredItems: FeaturedWorkItem[] = t('work.items', {}, { returnObjects: true });

    return (
        <Box mb={"xl"}>
            <SectionHeader anchor='work' title='Work' subtext='Check out my featured projects below.' />

            <Stack spacing={"xl"} mb={"xl"}>
                {
                    featuredItems && Array.isArray(featuredItems) && featuredItems.map((item, index) => (

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

            <Space h={'lg'} />

            <SimpleGrid cols={3}>
                <OtherWorkItem
                    title='Testproject where we do cool shit'
                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, eu aliquam nunc nisl eget nunc.'
                    tags={['React', 'Next.js', 'TypeScript', 'Mantine']}
                    internalLink='/work/testproject'
                    externalLink='https://google.com'
                    githubLink='https://github.com'
                />
            </SimpleGrid>

        </Box>
    )
}

export default WorkSection