import { createStyles, Group, MediaQuery, Stack, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Tag from '../../interfaces/tag';
import { toLink } from '../../lib/util';

const useStyles = createStyles((theme) => {

    return {

        title: {
            color: theme.colorScheme === 'dark' ? 'white' : theme.black,
            lineHeight: 1.15,
            marginBottom: theme.spacing.sm,
            fontSize: '1.2em',
            fontWeight: 600,

            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                paddingBottom: theme.spacing.xs,
            },
        },

        tag: {
            textTransform: 'uppercase',
            fontFamily: theme.fontFamilyMonospace,
            color: theme.colors.primary[4],

            '&:hover': {
                textDecoration: 'underline',
            },

            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                lineHeight: .6,
            },
        },
    };
});

interface Props {
    tags: Tag[]
    title: string
}

const BlogTagList = ({ tags, title }: Props) => {

    const { classes } = useStyles();
    const { t } = useTranslation('blog');

    const tagList = tags.map((tag, i) => (
        <Link
            key={i}
            href={toLink('blog', 'tag', tag.name)}
            title={t('tagLinkTitle', { tag: tag.name })}
        >
            <Text key={i + "text"} className={classes.tag}>#{tag.name}</Text>
        </Link>
    ));

    return (
        <>
            <Text className={classes.title}>{title}</Text>

            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                <Stack spacing={0}>
                    {tagList}
                </Stack>
            </MediaQuery>

            <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                <Group spacing={"md"}>
                    {tagList}
                </Group>
            </MediaQuery>

        </>
    )
}

export default BlogTagList;