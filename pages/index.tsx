import { Container, Space, Stack } from '@mantine/core'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Project from '../interfaces/project'
import { getAllProjects } from '../lib/apis/projectApi'
import AboutSection from '../ui/index/about-section'
import ExperienceSection from '../ui/index/experience-section'
import HeroSection from '../ui/index/hero-section'
import WorkSection from '../ui/index/work-section'

interface Props {
  featuredProjects: Project[]
  otherProjects: Project[]
}

const Home: NextPage<Props> = ({ featuredProjects, otherProjects }: Props) => {

  return (
    <>
      <Head>
        <title>Sebastian Schuler | Home</title>
      </Head>

      <Container>

        <HeroSection />

        <Stack spacing={150}>
          <AboutSection />
          <ExperienceSection />
          <WorkSection
            featuredProjects={featuredProjects}
            otherProjects={otherProjects}
          />
        </Stack>

        <Space h={150} />

      </Container>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  /* GetStaticProps seems to work fine, might cause problems with cookies, theme, etc.
  If GetServerSideProps is used, this can be a workaround for caching:
     context.res.setHeader(
       'Cache-Control',
       'public, s-maxage=10, stale-while-revalidate=59'
     )
  */

  let projects = getAllProjects([
    'title',
    'date',
    'slug',
    'tags',
    'coverImage',
    'excerpt',
    'featured',
    'githubUrl',
    'externalUrl',
  ], {
    locale: ctx.locale
  });

  const featuredProjects = projects.filter(project => project.featured);
  let otherProjects = projects.filter(project => !project.featured);

  otherProjects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (otherProjects.length > 9) {
    otherProjects = otherProjects.slice(0, 9);
  }

  return {
    props: {
      featuredProjects,
      otherProjects,
    },
  }
}

export default Home
