import { Container, Space, useMantineTheme } from '@mantine/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { Root } from 'remark-html'
import { getAllProjects, getProjectBySlug, getRecommendedProjects } from '../../lib/api/projectApi'
import { PAGE_URL } from '../../lib/constants'
import { MarkdownParser } from '../../lib/markdown/customMarkdownParser'
import markdownToHtml from '../../lib/markdown/markdownToHtml'
import { getMetaDescription } from '../../lib/seoTools'
import { formatDate } from '../../lib/util'
import { Project } from '../../types/portfolio'
import PageBreadcrumbs from '../../ui/breadcrumbs'
import PortfolioHeader from '../../ui/portfolio/project-header'
import MyTitle from '../../ui/title'
import ProjectFooter from '../../ui/portfolio/project-footer'

type Props = {
  content: Root
  project: Project
  recommendedProjects: Project[]
}

const ProjectPost: React.FC<Props> = ({ project, recommendedProjects, content }) => {

  const { t, lang } = useTranslation('portfolio');
  const theme = useMantineTheme();

  const parser = new MarkdownParser(theme);
  const jsxContent = parser.renderMarkdown(content);
  const headers = parser.getHeaders();

  const router = useRouter();
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";

  return (
    <Container>

      <PageBreadcrumbs projectTitle={project.title} />

      {router.isFallback ? (
        <MyTitle>Loading...</MyTitle>
      ) : (
        <>
          <article>

            <Head>
              <title>{t("portfolioItemTabTitle", { title: project.title, date: formatDate(project.date, lang), tags: project.tags.join(', ') })}</title>
              <meta name='description' content={getMetaDescription(project.excerpt)} />
              <meta property='og:title' content={project.title} />
              <meta property='og:description' content={project.ogDesc} />
              <meta property='og:url' content={`${PAGE_URL}/${localePart}blog/${project.slug}`} />
              {project.ogImage && <meta property="og:image" content={project.ogImage.url} />}
            </Head>

            <PortfolioHeader
              title={project.title}
              date={project.date}
              headers={headers}
              githubUrl={project.githubUrl}
              appUrl={project.appUrl}
            />

            {jsxContent}

            <Space h="md" />

            <ProjectFooter recommendedProjects={recommendedProjects} />

          </article>
        </>
      )}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const slug = context.params?.ProjectSlug as string;

  const project = getProjectBySlug(slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'ogDesc',
    'coverImage',
    'tags',
  ], { locale: context.locale });

  const recommendedProjects = getRecommendedProjects(slug, project.tags);
  const content = await markdownToHtml(project.content || '');

  const props: Props = {
    content,
    project,
    recommendedProjects
  };

  return {
    props,
    revalidate: 600, // In seconds
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const projects = getAllProjects(['slug']);

  let paths: {
    params: ParsedUrlQuery;
    locale?: string | undefined;
  }[] = [];

  locales?.forEach(locale => {
    projects.forEach(project => {
      paths.push({
        params: {
          ProjectSlug: project.slug,
        },
        locale: locale,
      })
    })
  });

  return {
    paths: paths,
    fallback: false,
  }
}

export default ProjectPost