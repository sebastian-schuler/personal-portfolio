import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import React from 'react'
import PostType from '../../interfaces/post'
import { getAllPosts, getPostBySlug } from '../../lib/blogApi'
import markdownToHtml from '../../lib/markdownToHtml'
import Head from 'next/head'
import PostHeader from '../../ui/blog/post-header'
import PostBody from '../../ui/blog/post-body'
import { Container, Title } from '@mantine/core'
import PostTitle from '../../ui/blog/post-title'
import PostNav from '../../ui/blog/post-nav'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const BlogPost: React.FC<Props> = ({ post, morePosts, preview }) => {

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      {/* <Layout preview={preview}> */}
      <Container>
        <PostNav />
        {router.isFallback ? (
          <PostTitle>Loading...</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title + '| Next.js Blog Example'}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
      {/* </Layout> */}
    </>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default BlogPost