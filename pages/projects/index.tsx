import { Container, Space, Text } from '@mantine/core'
import { GetServerSideProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Project from '../../interfaces/project'
import { getAllProjects, getProjectsPageCount } from '../../lib/apis/projectApi'
import { PAGE_URL } from '../../lib/constants'
import PageBreadcrumbs from '../../ui/breadcrumbs'
import MyPagination from '../../ui/my-pagination'
import MyTitle from '../../ui/my-title'
import ProjectList from '../../ui/projects/project-list'

interface Props {
  pageCount: number
  projects: Project[]
}

const ProjectsPage = ({ pageCount, projects }: Props) => {

  const router = useRouter();
  const currentPage = router.query.page ? parseInt(router.query.page as string) : 1;
  const { t } = useTranslation('projects');

  const getCanonicalLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = currentPage > 1 ? "/page=" + currentPage : "";
    return `${PAGE_URL}/${localePart}projects${pageNumber}`
  }

  const getPrevLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = "/page=" + (currentPage - 1);
    return `${PAGE_URL}/${localePart}projects${pageNumber}`
  }

  const getNextLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = "/page=" + (currentPage + 1);
    return `${PAGE_URL}/${localePart}projects${pageNumber}`
  }

  return (
    <>
      <Head>
        <title>{t("projectsPageTabTitle", { page: currentPage })}</title>
        <link rel="canonical" href={getCanonicalLink()} />
        {
          currentPage > 1 && (
            <link rel='prev' href={getPrevLink()} />
          )
        }
        {
          currentPage < pageCount && (
            <link rel='next' href={getNextLink()} />
          )
        }
      </Head>
      <Container>

        <PageBreadcrumbs />
        <MyTitle>{t("title")}</MyTitle>
        <Text mt={'xs'}>{t("subtitle")}</Text>
        <Space h={'lg'} />

        <ProjectList projects={projects} />
        <MyPagination
          currentPage={currentPage}
          pageCount={pageCount}
          rootPath={'projects'}
        />

      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const page = context.query.page ? parseInt(context.query.page as string) : 1;
  const pageCount = getProjectsPageCount();

  let projects = getAllProjects([
    'title',
    'date',
    'slug',
    'tags',
    'coverImage',
    'excerpt',
  ], {
    page: page,
    locale: context.locale
  });

  return {
    props: {
      pageCount,
      projects,
    },
  }
}

export default ProjectsPage