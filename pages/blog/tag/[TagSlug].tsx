import { Container, Grid, Space } from '@mantine/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import Post from '../../../interfaces/post';
import { getAllTags, getPostsByTag } from '../../../lib/blogApi';
import BlogPostList from '../../../ui/blog/blog-post-list';
import BlogTitle from '../../../ui/blog/blog-title';
import PageBreadcrumbs from '../../../ui/breadcrumbs';

interface Props {
  tag: string
  allPosts: Post[]
}

const BlogTag = ({ tag, allPosts }: Props) => {

  const { t } = useTranslation('blog');

  return (
    <>
      <Head>
        <title>{t("tagPageTabTitle", { tag: "#" + tag.toUpperCase() })}</title>
      </Head>
      <Container>

        <PageBreadcrumbs />
        <BlogTitle isTag>{tag}</BlogTitle>
        <Space h={'lg'} />

        <Grid gutter={'xl'} pb={'xl'}>

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
  ], { locale: context.locale });

  return {
    props: {
      tag,
      allPosts,
    },
    revalidate: 600, // 10 minutes
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const tags = getAllTags();

  let paths: {
    params: ParsedUrlQuery;
    locale?: string | undefined;
  }[] = [];

  locales?.forEach(locale => {
    tags.forEach(tag => {
      paths.push({
        params: {
          TagSlug: tag.name,
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

export default BlogTag;