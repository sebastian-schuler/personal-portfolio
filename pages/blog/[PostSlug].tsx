import { Container, Space, useMantineTheme } from '@mantine/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { Root } from 'remark-html'
import { getAllPosts, getPostBySlug, getRecommendedPosts } from '../../lib/api/blogApi'
import { PAGE_URL } from '../../lib/constants'
import { MarkdownParser } from '../../lib/markdown/customMarkdownParser'
import markdownToHtml from '../../lib/markdown/markdownToHtml'
import { getMetaDescription } from '../../lib/seoTools'
import { formatDate } from '../../lib/util'
import { Post } from '../../types/blog'
import PostFooter from '../../ui/blog/post-footer'
import PostHeader from '../../ui/blog/post-header'
import PageBreadcrumbs from '../../ui/breadcrumbs'
import MyTitle from '../../ui/title'

type Props = {
  content: Root
  post: Post
  recommendedPosts: Post[]
}

const BlogPost: React.FC<Props> = ({ post, recommendedPosts, content }) => {

  const { t, lang } = useTranslation('blog');
  const theme = useMantineTheme();

  const parser = new MarkdownParser(theme);
  const jsxContent = parser.renderMarkdown(content);
  const headers = parser.getHeaders();

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

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
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              tags={post.tags}
              excerpt={post.excerpt}
              readTime={post.readTime}
              headers={headers}
              languages={post.locales}
            />

            <Space h="md" />

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
  const locale = context.locale || context.defaultLocale || 'en';

  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'ogDesc',
    'coverImage',
    'tags',
  ], { locale: locale });

  const recommendedPosts = getRecommendedPosts(slug, post.tags, locale);
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