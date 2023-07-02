import { Container, SimpleGrid, Space, Text } from '@mantine/core';
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
}

const PortfolioPage: NextPage<Props> = ({ projects }: Props) => {

  const { t } = useTranslation('portfolio');

  const [filter, setFilter] = useState<string[] | undefined>();
  const tags: string[] = [...new Set(projects.map((item) => item.tags).flat())].sort();

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
            { minWidth: 'sm', cols: 3, spacing: 'md' },
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

  const props: Props = {
    projects: projects
  }

  return { props };
}

export default PortfolioPage;