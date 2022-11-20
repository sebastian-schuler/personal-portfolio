import { Divider, Stack } from '@mantine/core';
import Post from '../../interfaces/post';
import PostPreview from './post-preview';

interface Props {
    posts: Post[]
}

const BlogPostList = ({ posts }: Props) => {
    return (
        <section>
            <Stack spacing={'lg'}>
                {
                    posts.map((post, i) => (
                        <div key={i}>
                            <PostPreview
                                title={post.title}
                                coverImage={post.coverImage}
                                date={post.date}
                                excerpt={post.excerpt || ''}
                                slug={post.slug}
                                tags={post.tags}
                                readTime={post.readTime}
                                locales={post.locales}
                            />
                            {
                                i < posts.length - 1 && <Divider mt={'lg'} />
                            }
                        </div>
                    ))
                }
            </Stack>
        </section>
    )
}

export default BlogPostList;