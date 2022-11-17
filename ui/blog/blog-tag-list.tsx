import { createStyles, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { toLink } from '../../lib/util';

const useStyles = createStyles((theme) => {

    return {

        title: {
            color: theme.colorScheme === 'dark' ? 'white' : theme.black,
            lineHeight: 1.15,
            marginBottom: theme.spacing.sm,
            fontSize: '1.2em',
        },

        tag: {
            textTransform: 'uppercase',
            fontFamily: theme.fontFamilyMonospace,
            color: theme.colors.primary[4],

            '&:hover': {
                textDecoration: 'underline',
            }
        },
    };
});

interface Props {
    tags: string[]
}

const BlogTagList = ({ tags }: Props) => {

    const { classes } = useStyles();

    return (
        <>
            <Text className={classes.title}>Search by tag</Text>
            <Stack spacing={0}>
                {
                    tags.map((tag, i) => (
                        <Link key={i} href={toLink('blog', 'tags', tag)}>
                            <Text key={i+"text"} className={classes.tag}>#{tag}</Text>
                        </Link>
                    ))
                }
            </Stack>
        </>
    )
}

export default BlogTagList;