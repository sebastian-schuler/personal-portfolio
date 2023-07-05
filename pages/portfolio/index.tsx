import { Container, SimpleGrid, Text } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useState } from 'react';
import { getAllProjects } from '../../lib/api/projectApi';
import { Project } from '../../types/portfolio';
import PageBreadcrumbs from '../../ui/breadcrumbs';
import PortfolioFilter from '../../ui/portfolio/portfolio-filter';
import PortfolioPreview from '../../ui/portfolio/portfolio-preview';
import MyTitle from '../../ui/title';

interface Props {
  projects: Project[];
  tags: string[];
}

const PortfolioPage: NextPage<Props> = ({ projects, tags }: Props) => {

  const { t } = useTranslation('portfolio');
  const [filter, setFilter] = useState<string[] | undefined>();

  const items = projects.filter(item => {

    if (filter === undefined) return true;
    if (filter.length === 0) return true;
    if (item.tags.some(tag => filter.includes(tag))) return true;
    return false;

  }).map((item) => {
    return (
      <PortfolioPreview
        key={item.slug}
        slug={item.slug}
        title={item.title}
        description={item.excerpt}
        image={item.coverImage}
        appUrl={item.appUrl}
        githubUrl={item.githubUrl}
      />
    );
  });

  return (
    <>
      <Head>
        <title>{t("portfolioPageTabTitle")}</title>
      </Head>

      <Container pb={'xl'}>
        <PageBreadcrumbs />
        <MyTitle>{t("title")}</MyTitle>
        <Text mt={'xs'}>{t("subtitle")}</Text>

        <PortfolioFilter tags={tags} filter={filter} setFilter={setFilter} />

        <SimpleGrid
          spacing={'lg'}
          breakpoints={[
            { minWidth: 'md', cols: 3, spacing: 'md' },
            { minWidth: 'xs', cols: 2, spacing: 'md' },
            { cols: 3, spacing: 'sm' },
          ]}
        >
          <AnimatePresence>
            {items}
          </AnimatePresence>
        </SimpleGrid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  // Get all projects
  const projects = getAllProjects([
    'title',
    'date',
    'slug',
    'tags',
    'coverImage',
    'excerpt',
    'githubUrl',
    'appUrl',
  ], {
    locale: context.locale || 'en'
  });

  // Count how many times each tag is used
  const tagCounts = new Map<string, number>();
  projects.forEach((item) => {
    item.tags.forEach((tag) => {
      const count = tagCounts.get(tag) || 0;
      tagCounts.set(tag, count + 1);
    });
  });

  // Sort tags by count
  const sortedTags = Array.from(tagCounts, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const props: Props = {
    projects: projects,
    tags: sortedTags.map(tag => tag.name)
  }

  return { props };
}

export default PortfolioPage;