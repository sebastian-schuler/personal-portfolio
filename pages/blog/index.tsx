import { Container, Grid, Space, Text } from '@mantine/core'
import { GetServerSideProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAllPosts, getAllPostTags, getBlogPageCount } from '../../lib/api/blogApi'
import { PAGE_URL } from '../../lib/constants'
import { Post, Tag } from '../../types/blog'
import BlogPostList from '../../ui/blog/blog-post-list'
import BlogTagList from '../../ui/blog/blog-tag-list'
import PageBreadcrumbs from '../../ui/breadcrumbs'
import MyPagination from '../../ui/pagination'
import MyTitle from '../../ui/title'

interface Props {
  pageCount: number
  tags: Tag[]
  allPosts: Post[]
}

const BlogPage = ({ pageCount, tags, allPosts }: Props) => {

  const router = useRouter();
  const currentPage = router.query.page ? parseInt(router.query.page as string) : 1;
  const { t } = useTranslation('blog');

  const getCanonicalLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = currentPage > 1 ? "/page=" + currentPage : "";
    return `${PAGE_URL}/${localePart}blog${pageNumber}`
  }

  const getPrevLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = "/page=" + (currentPage - 1);
    return `${PAGE_URL}/${localePart}blog${pageNumber}`
  }

  const getNextLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = "/page=" + (currentPage + 1);
    return `${PAGE_URL}/${localePart}blog${pageNumber}`
  }

  return (
    <>
      <Head>
        <title>{t("blogPageTabTitle", { page: currentPage })}</title>
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
      <Container pb={'xl'}>

        <PageBreadcrumbs />
        <MyTitle>{t("title")}</MyTitle>
        <Text mt={'xs'}>{t("subtitle")}</Text>
        <Space h={'lg'} />

        <Grid gutter={'lg'} gutterMd={'xl'}>

          <Grid.Col order={2} orderMd={1} sm={12} md={'auto'}>
            <BlogPostList posts={allPosts} />
            <MyPagination
              currentPage={currentPage}
              pageCount={pageCount}
              rootPath={'blog'}
            />
          </Grid.Col>

          <Grid.Col order={1} orderMd={2} sm={12} md={'content'}>
            <BlogTagList tags={tags} title={t("tagListTitle")} />
          </Grid.Col>

        </Grid>

      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const page = context.query.page ? parseInt(context.query.page as string) : 1;
  const tags = getAllPostTags();
  const pageCount = getBlogPageCount();

  let allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'tags',
    'coverImage',
    'excerpt',
    'readTime',
  ], {
    page: page,
    locale: context.locale
  });

  return {
    props: {
      pageCount,
      tags,
      allPosts,
    },
  }
}

export default BlogPage;