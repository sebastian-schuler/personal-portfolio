import { Container, Grid, Space } from '@mantine/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import Post from '../../../interfaces/post';
import Tag from '../../../interfaces/tag';
import { getAllPostTags, getPostsByTag } from '../../../lib/api/blogApi';
import BlogPostList from '../../../ui/blog/blog-post-list';
import BlogTagList from '../../../ui/blog/blog-tag-list';
import MyTitle from '../../../ui/my-title';
import PageBreadcrumbs from '../../../ui/breadcrumbs';

interface Props {
  otherTags: Tag[]
  tag: string
  allPosts: Post[]
}

const BlogTag = ({ otherTags, tag, allPosts }: Props) => {

  const { t } = useTranslation('blog');

  return (
    <>
      <Head>
        <title>{t("tagPageTabTitle", { tag: "#" + tag.toUpperCase() })}</title>
      </Head>
      <Container>

        <PageBreadcrumbs />
        <MyTitle isTag>{tag}</MyTitle>
        <Space h={'lg'} />

        <Grid gutter={'xl'} pb={'xl'}>

          <Grid.Col span={8}>
            <BlogPostList posts={allPosts} />
          </Grid.Col>

          <Grid.Col span={4}>
            <BlogTagList tags={otherTags} title={t("tagPageTagListTitle")} />
          </Grid.Col>

        </Grid>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const tag = context.params?.TagSlug as string;
  const otherTags = getAllPostTags().filter(t => t.name !== tag);

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
      otherTags,
      tag,
      allPosts,
    },
    revalidate: 600, // 10 minutes
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const tags = getAllPostTags();

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