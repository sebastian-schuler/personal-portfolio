import { Container, Grid, Pagination, Space, Text } from '@mantine/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PostType from '../../interfaces/post'
import { getAllPosts, getAllTags, getPageCount } from '../../lib/blogApi'
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
  const currentPage = router.query.BlogPage ? parseInt(router.query.BlogPage as string) : 1;

  const changePage = (page: number) => {
    router.push(`/blog/${page}`);
  }

  return (
    <>
      <Head>
        <title>Sebastian Schuler - Blog</title>
      </Head>
      <Container>

        <PageBreadcrumbs />
        <BlogTitle>Blog</BlogTitle>
        <Text>My personal blog focused on technology and coding.</Text>
        <Space h={'xl'}/>

        <Grid gutter={'xl'} pb={'xl'}>

          <Grid.Col span={8}>
            <BlogPostList posts={allPosts} />
            <Pagination
              page={currentPage}
              onChange={changePage}
              total={pageCount}
              position='center'
              mt={'lg'}
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

export const getStaticProps: GetStaticProps = async (context) => {

  const page = context.params?.BlogPage ? parseInt(context.params.BlogPage as string) : 1;
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
    revalidate: 600, // 10 minutes
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  const pageCount = getPageCount();

  // Fill array 1...pageCount
  let i = 0, arr: string[] = Array(pageCount);
  while (i < pageCount) arr[i++] = i.toString();

  return {
    paths: arr.map((pageNumber) => {
      return {
        params: {
          BlogPage: pageNumber,
        },
      }
    }),
    fallback: false,
  }
}

export default BlogPage;