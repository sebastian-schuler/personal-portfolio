import { Container } from '@mantine/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import Post from '../../../interfaces/post'
import { getAllPosts, getPostBySlug } from '../../../lib/blogApi'
import { PAGE_URL } from '../../../lib/constants'
import markdownToHtml from '../../../lib/markdownToHtml'
import PostTitle from '../../../ui/blog/blog-title'
import PostBody from '../../../ui/blog/post-body'
import PostHeader from '../../../ui/blog/post-header'
import PageBreadcrumbs from '../../../ui/breadcrumbs'

type Props = {
  post: Post
  morePosts: Post[]
}

const BlogPost: React.FC<Props> = ({ post, morePosts }) => {

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";

  return (
    <Container>

      <PageBreadcrumbs postTitle={post.title} />

      {router.isFallback ? (
        <PostTitle>Loading...</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>
                {post.title + '| Next.js Blog Example'}
              </title>
              <meta property='og:title' content={post.title} />
              <meta property='og:description' content={post.ogDesc} />
              <meta property='og:url' content={`${PAGE_URL}/${localePart}blog/post/${post.slug}`} />
              {
                post.ogImage && <meta property="og:image" content={post.ogImage.url} />
              }
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              tags={post.tags}
            />
            <PostBody
              excerpt={post.excerpt}
              content={post.content || ""}
            />
          </article>
        </>
      )}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const slug = context.params?.PostSlug as string

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

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
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