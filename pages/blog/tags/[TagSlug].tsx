import { Container, Grid } from '@mantine/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import PostType from '../../../interfaces/post';
import { getAllTags, getPostsByTag } from '../../../lib/blogApi';
import BlogPostList from '../../../ui/blog/blog-post-list';
import BlogTitle from '../../../ui/blog/blog-title';
import PageBreadcrumbs from '../../../ui/breadcrumbs';

interface Props {
  tag: string
  allPosts: PostType[]
}

const BlogTag = ({ tag, allPosts }: Props) => {

  return (
    <>
      <Head>
        <title>{'Sebastian Schuler - Blog'}</title>
      </Head>
      <Container>

        <PageBreadcrumbs />
        <BlogTitle isTag>{tag}</BlogTitle>

        <Grid gutter={'xl'}>

          <Grid.Col span={8}>
            <BlogPostList posts={allPosts} />
          </Grid.Col>

          <Grid.Col span={4}>
          </Grid.Col>

        </Grid>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const tag = context.params?.TagSlug as string;

  const allPosts = getPostsByTag(tag, [
    'title',
    'date',
    'slug',
    'tags',
    'coverImage',
    'excerpt',
    'readTime',
  ]);

  return {
    props: {
      tag,
      allPosts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags();

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          TagSlug: tag,
        },
      }
    }),
    fallback: false,
  }
}

export default BlogTag;