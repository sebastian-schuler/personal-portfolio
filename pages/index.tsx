import { Container, Stack } from '@mantine/core'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Post } from '../interfaces/post'
import { getAllPostedProjects } from '../lib/api/blogApi'
import AboutSection from '../ui/index/about-section'
import ExperienceSection from '../ui/index/experience-section'
import HeroSection from '../ui/index/hero-section'
import WorkSection from '../ui/index/work-section'

interface Props {
  featuredProjects: Post[]
  otherProjects: Post[]
}

const Home: NextPage<Props> = ({ featuredProjects, otherProjects }: Props) => {

  return (
    <>
      <Head>
        <title>Sebastian Schuler | Home</title>
      </Head>

      <Container>

        <HeroSection />

        <Stack spacing={150} mb={'xl'}>
          <AboutSection />
          <ExperienceSection />
          <WorkSection
            featuredProjects={featuredProjects}
            otherProjects={otherProjects}
          />
        </Stack>

      </Container>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  let projects = getAllPostedProjects([
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

  let featuredProjects: Post[] = [];
  let otherProjects: Post[] = [];

  for (const project of projects) {
    if (project.type !== "project") continue;
    if (project.featured) {
      featuredProjects.push(project);
    } else {
      otherProjects.push(project);
    }
  }

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
    revalidate: 120,
  }
}

export default Home
