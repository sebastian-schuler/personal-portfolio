import { Badge, Box, Divider, Group, Stack, Text, useMantineTheme } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { PostType } from "../../interfaces/post"
import { toLink } from "../../lib/util"
import DateFormatter from "../date-formatter"
import ILink from "../link"
import MyTitle from "../title"
import PostSharePanel from "./post-share-panel"

type Props = {
    type: PostType
    title: string
    coverImage: string
    date: string
    tags: string[]
    excerpt: string
    readTime: number
}

const PostHeader = ({ type, title, coverImage, date, tags, excerpt, readTime }: Props) => {

    const { t } = useTranslation('blog');
    const theme = useMantineTheme();

    const postTypeNode = type === 'article' ?
        <Badge
            variant='filled'
            radius={'md'}
            color={'themeBlue.7'}
            size={'lg'}
        >{t('common:post.typeArticle')}</Badge> :
        <Badge
            variant='filled'
            radius={'md'}
            color={'themePurple.4'}
            size={'lg'}
        >{t('common:post.typeProject')}</Badge>;

    const postTags = <Group spacing={'sm'}>
        {postTypeNode}
        {
            tags.map((tag, i) => (
                <Badge
                    variant='outline'
                    radius={'md'}
                    size={'lg'}
                >#{tag}</Badge>
            ))
        }
    </Group>

    return (
        <Box mb={'md'}>

            <MyTitle>{postTags}{title}</MyTitle>

            <Group position="apart" align={'end'} mt={'sm'}>
                <Text size='md'>
                    <DateFormatter dateString={date} /> • {readTime} min read
                </Text>
                <PostSharePanel title={title} />
            </Group>

            <Divider mt={'xs'} mb={'md'} />

            <div>
                <Text size={'lg'} color={theme.colorScheme === "dark" ? 'white' : theme.black}>Excerpt</Text>
                <Text>{excerpt}</Text>
            </div>

        </Box>
    )
}

export default PostHeader;
