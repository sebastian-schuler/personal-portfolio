import { Container, Stack } from '@mantine/core'
import { GetServerSideProps, NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { getFeaturedPortfolioData } from '../lib/api/projectApi'
import { Project } from '../types/portfolio'
import AboutSection from '../ui/index/about-section'
import ExperienceSection from '../ui/index/experience-section'
import HeroSection from '../ui/index/hero-section'
import WorkSection from '../ui/index/work-section'

interface Props {
  featuredProjects: Project[]
}

const Home: NextPage<Props> = ({ featuredProjects }: Props) => {

  const { t } = useTranslation('index');

  return (
    <>
      <Head>
        <title>{t('indexPageTabTitle')}</title>
      </Head>

      <Container>

        <HeroSection />

        <Stack spacing={150} mb={'xl'}>
          <AboutSection />
          <ExperienceSection />
          <WorkSection featuredProjects={featuredProjects} />
        </Stack>

      </Container>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // Add whatever `Cache-Control` value you want here
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=600'
  );

  const featuredProjects = await getFeaturedPortfolioData(ctx.locale || "en");

  return {
    props: {
      featuredProjects,
    }
  }
}

export default Home
