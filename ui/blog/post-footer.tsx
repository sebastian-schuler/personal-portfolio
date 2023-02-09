import { createStyles, Divider, SimpleGrid, Space, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import { Post } from '../../types/blog';
import PostPreview from './post-preview';

const useStyles = createStyles((theme) => {

    return {

        title: {
            color: theme.colorScheme === 'dark' ? 'white' : theme.black,
        },

        cardTitle: {
            color: theme.colorScheme === 'dark' ? 'white' : theme.black,
            marginBottom: theme.spacing.sm,
            fontSize: '1.2em',
            fontWeight: 600,
        },

        card: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
        },

    };
});

type Props = {
    recommendedPosts: Post[]
}

const PostFooter = ({ recommendedPosts }: Props) => {

    const { classes } = useStyles();
    const { t } = useTranslation('blog');

    return (
        <>
            <Divider my={'xl'} />

            <Text size={48} mb={"lg"} className={classes.title}>{t("otherPostsHeader")}</Text>

            <SimpleGrid
                breakpoints={[
                    { minWidth: 'sm', cols: 1 },
                    { minWidth: 'md', cols: 2 },
                ]}
                spacing='lg'>
                {
                    recommendedPosts.map((post, index) => (
                        <PostPreview
                            key={index}
                            title={post.title}
                            slug={post.slug}
                            date={post.date}
                            coverImage={post.coverImage}
                            excerpt={post.excerpt}
                            locales={post.locales}
                            readTime={post.readTime}
                            tags={post.tags}
                        />
                    ))
                }
            </SimpleGrid>

            <Space h={"xl"} />
        </>
    )
}

export default PostFooter;