import { Container, Grid, Pagination, Space, Text } from '@mantine/core'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PostType from '../../interfaces/post'
import { getAllPosts, getAllTags, getPageCount } from '../../lib/blogApi'
import { PAGE_URL } from '../../lib/constants'
import { toLink } from '../../lib/util'
import BlogPagination from '../../ui/blog/blog-pagination'
import BlogPostList from '../../ui/blog/blog-post-list'
import BlogTagList from '../../ui/blog/blog-tag-list'
import BlogTitle from '../../ui/blog/blog-title'
import PageBreadcrumbs from '../../ui/breadcrumbs'

interface Props {
  pageCount: number
  tags: string[]
  allPosts: PostType[]
}

const BlogPage = ({ pageCount, tags, allPosts }: Props) => {

  const router = useRouter();
  const currentPage = router.query.page ? parseInt(router.query.page as string) : 1;

  const getCanonicalLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = currentPage > 1 ? "/page=" + currentPage : "";
    return `${PAGE_URL}/${localePart}blog${pageNumber}`
  }

  const getPrevLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    return `${PAGE_URL}/${localePart}blog`
  }

  return (
    <>
      <Head>
        <title>Sebastian Schuler - Blog</title>
        <link rel="canonical" href={getCanonicalLink()} />
        {
          currentPage > 1 && (
            <link rel='prev' href='' />
          )
        }
      </Head>
      <Container>

        <PageBreadcrumbs />
        <BlogTitle>Blog</BlogTitle>
        <Text>My personal blog focused on technology and coding.</Text>
        <Space h={'xl'} />

        <Grid gutter={'xl'} pb={'xl'}>

          <Grid.Col span={8}>
            <BlogPostList posts={allPosts} />
            <BlogPagination
              currentPage={currentPage}
              pageCount={pageCount}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <BlogTagList tags={tags} />
          </Grid.Col>

        </Grid>

      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const page = context.query.page ? parseInt(context.query.page as string) : 1;
  const tags = getAllTags();
  const pageCount = getPageCount();

  let allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'tags',
    'coverImage',
    'excerpt',
    'readTime',
  ]);

  allPosts = allPosts.slice((page - 1) * 10, page * 10);


  return {
    props: {
      pageCount,
      tags,
      allPosts,
    },
  }
}

export default BlogPage;