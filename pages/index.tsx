import { Container, Stack } from '@mantine/core'
import { GetStaticProps, NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { getFeaturedPortfolioData } from '../lib/api/portfolioApi'
import { PortfolioItem } from '../types/portfolio'
import AboutSection from '../ui/index/about-section'
import ExperienceSection from '../ui/index/experience-section'
import HeroSection from '../ui/index/hero-section'
import WorkSection from '../ui/index/work-section'

interface Props {
  featuredProjects: PortfolioItem[]
}

const Home: NextPage<Props> = ({ featuredProjects }: Props) => {

  const {t} = useTranslation('index');

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


export const getStaticProps: GetStaticProps = async (ctx) => {

  const featuredProjects = await getFeaturedPortfolioData("en");

  return {
    props: {
      featuredProjects,
    },
    revalidate: 120,
  }
}

export default Home
