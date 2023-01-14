import { Card, createStyles, Divider, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react'
import { Post } from '../../interfaces/post';

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
            <Divider mt={'xl'} mb={'lg'} />

            <Text size={"lg"} mb={"lg"} weight={"bold"} className={classes.title}>{t("otherPostsHeader")}</Text>

            <SimpleGrid cols={2}>
                {
                    recommendedPosts.map((post, index) => (
                        <Link key={index} href={`/blog/${post.slug}`}>
                            <Card className={classes.card}>
                                <Text className={classes.cardTitle}>{post.title}</Text>
                                <Text lineClamp={3}>{post.excerpt}</Text>
                            </Card>
                        </Link>
                    ))
                }
            </SimpleGrid>

            <Space h={"xl"} />
        </>
    )
}

export default PostFooter;