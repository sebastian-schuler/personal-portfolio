import { Container } from '@mantine/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import PostType from '../../../interfaces/post'
import { getAllPosts, getPostBySlug } from '../../../lib/blogApi'
import markdownToHtml from '../../../lib/markdownToHtml'
import PostTitle from '../../../ui/blog/blog-title'
import PostBody from '../../../ui/blog/post-body'
import PostHeader from '../../../ui/blog/post-header'
import PageBreadcrumbs from '../../../ui/breadcrumbs'

type Props = {
  post: PostType
  morePosts: PostType[]
}

const BlogPost: React.FC<Props> = ({ post, morePosts }) => {

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

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
              <meta property='og:description' content='Description that will show in the preview' />
              <meta property='og:url' content='//www.example.com/URL' />
              {
                post.ogImage && <meta property="og:image" content={post.ogImage.url} />
              }
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
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
    'coverImage',
    'tags',
  ]);

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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          PostSlug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default BlogPost