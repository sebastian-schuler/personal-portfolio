import { Container, SimpleGrid, Space, Text } from '@mantine/core';
import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { getPortfolioData } from '../../lib/api/portfolioApi';
import { PortfolioItem } from '../../types/portfolio';
import PageBreadcrumbs from '../../ui/breadcrumbs';
import PortfolioPreview from '../../ui/portfolio/portfolio-preview';
import MyTitle from '../../ui/title';

interface Props {
  data: PortfolioItem[];
}

const PortfolioPage: NextPage<Props> = ({ data }: Props) => {

  const { t } = useTranslation('portfolio');

  const items = data.map((item) => {
    return (
      <PortfolioPreview
        key={item.slug}
        slug={item.slug}
        title={item.title}
        description={item.description}
        image={item.image}
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
        <Space h={'lg'} />
        <SimpleGrid
          spacing={'lg'}
          breakpoints={[
            { minWidth: 'md', cols: 3, spacing: 'md' },
            { minWidth: 'sm', cols: 3, spacing: 'md' },
            { minWidth: 'xs', cols: 2, spacing: 'md' },
            { cols: 1, spacing: 'sm' },
          ]}
        >
          {items}
        </SimpleGrid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const data = await getPortfolioData(context.locale || 'en');

  return {
    props: {
      data
    },
  }
}

export default PortfolioPage;