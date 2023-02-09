import { Anchor, Box, Button, Group, SimpleGrid, Skeleton, Space } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { SOCIAL_LINKS } from '../../lib/constants';
import { PortfolioItem } from '../../types/portfolio';
import PortfolioPreview from '../portfolio/portfolio-preview';
import SectionHeader from '../section-header';

interface Props {
    featuredProjects: PortfolioItem[]
}

const WorkSection = ({ featuredProjects }: Props) => {

    const { t } = useTranslation('index');

    return (
        <div>
            <SectionHeader
                anchor='work'
                title={t('work.title')}
                subtext={
                    <Trans
                        i18nKey="index:work.titleDescription"
                        components={[<Anchor component={NextLink} href='/portfolio' legacyBehavior />, <Anchor href={SOCIAL_LINKS.github.url} target='_blank' />]}
                    />
                }
            />

            <Space h={'lg'} />

            <SimpleGrid
                pb={'xl'}
                spacing={'lg'}
                breakpoints={[
                    { minWidth: 'md', cols: 3, spacing: 'md' },
                    { minWidth: 'sm', cols: 3, spacing: 'md' },
                    { minWidth: 'xs', cols: 2, spacing: 'md' },
                    { cols: 1, spacing: 'sm' },
                ]}
            >
                {
                    featuredProjects.map((item, i) => (
                        <PortfolioPreview
                            key={item.slug}
                            slug={item.slug}
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            appUrl={item.appUrl}
                            githubUrl={item.githubUrl}
                        />
                    ))
                }
            </SimpleGrid>

            <Group position='center'>
                <Button component={NextLink} href={'/portfolio'} variant='subtle' size='md' legacyBehavior>{t('work.portfolioButton')}</Button>
            </Group>
        </div>
    )
}

export default WorkSection