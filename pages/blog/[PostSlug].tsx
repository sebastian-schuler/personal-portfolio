import { Container, Space, useMantineTheme } from '@mantine/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { Root } from 'remark-html'
import { Post } from '../../interfaces/post'
import { getAllPosts, getPostBySlug, getRecommendedPosts } from '../../lib/api/blogApi'
import { PAGE_URL } from '../../lib/constants'
import { MarkdownParser } from '../../lib/markdown/customMarkdownParser'
import markdownToHtml from '../../lib/markdown/markdownToHtml'
import { getMetaDescription } from '../../lib/seoTools'
import { formatDate } from '../../lib/util'
import PostFooter from '../../ui/blog/post-footer'
import PostHeader from '../../ui/blog/post-header'
import PageBreadcrumbs from '../../ui/breadcrumbs'
import MyTitle from '../../ui/my-title'
import TableOfContents from '../../ui/table-of-contents'

type Props = {
  content: Root
  post: Post
  recommendedPosts: Post[]
}

const BlogPost: React.FC<Props> = ({ post, recommendedPosts, content }) => {

  const parser = new MarkdownParser();
  const jsxContent = parser.renderMarkdown(content);
  const headers = parser.getHeaders();

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { t, lang } = useTranslation('blog');
  const theme = useMantineTheme();
  const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";

  return (
    <Container>

      <PageBreadcrumbs postTitle={post.title} />

      {router.isFallback ? (
        <MyTitle>Loading...</MyTitle>
      ) : (
        <>
          <article>

            <Head>
              <title>{t("blogPostTabTitle", { title: post.title, date: formatDate(post.date, lang), tags: post.tags.join(', ') })}</title>
              <meta name='description' content={getMetaDescription(post.excerpt)} />

              <meta property='og:title' content={post.title} />
              <meta property='og:description' content={post.ogDesc} />
              <meta property='og:url' content={`${PAGE_URL}/${localePart}blog/${post.slug}`} />
              {post.ogImage && <meta property="og:image" content={post.ogImage.url} />}
            </Head>

            <PostHeader
              type={post.type}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              tags={post.tags}
              excerpt={post.excerpt}
              readTime={post.readTime}
            />

            <TableOfContents headers={headers} />

            <Space h="xl" />
            
            {jsxContent}

            <PostFooter recommendedPosts={recommendedPosts} />

          </article>
        </>
      )}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const slug = context.params?.PostSlug as string;

  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'ogDesc',
    'coverImage',
    'tags',
  ], { locale: context.locale });

  const recommendedPosts = getRecommendedPosts(slug, post.tags, post.type);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      content,
      post,
      recommendedPosts,
    },
    revalidate: 600, // In seconds
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = getAllPosts(['slug']);

  let paths: {
    params: ParsedUrlQuery;
    locale?: string | undefined;
  }[] = [];

  locales?.forEach(locale => {
    posts.forEach(post => {
      paths.push({
        params: {
          PostSlug: post.slug,
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

export default BlogPost