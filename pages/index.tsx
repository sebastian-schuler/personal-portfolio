import { Container } from '@mantine/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import AboutSection from '../ui/index/about-section'
import ExperienceSection from '../ui/index/experience-section'
import HeroSection from '../ui/index/hero-section'
import WorkSection from '../ui/index/work-section'

const Home = () => {

  return (
    <>
      <Head>
        <title>Sebastian Schuler | Home</title>
      </Head>

      <Container>

        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <WorkSection />

      </Container>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  }
}

export default Home
