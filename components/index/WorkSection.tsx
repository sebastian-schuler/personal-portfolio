import { useTranslation } from 'next-i18next'
import React from 'react'
import FeaturedWorkItem from '../features/FeaturedWorkItem'
import SectionHeader from '../features/SectionHeader'

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

    const featuredItems: FeaturedWorkItem[] = t('featuredWork.items', { returnObjects: true });

    return (
        <>
            <SectionHeader anchor='work' title='Work' order={2} />

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

        </>
    )
}

export default WorkSection