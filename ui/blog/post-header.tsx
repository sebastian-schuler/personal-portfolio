import { Badge, Divider, Group, Stack, Text } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { PostType } from "../../interfaces/post"
import { toLink } from "../../lib/util"
import DateFormatter from "../date-formatter"
import ILink from "../link"
import MyTitle from "../my-title"
import PostSharePanel from "./post-share-panel"

type Props = {
    type: PostType
    title: string
    coverImage: string
    date: string
    tags: string[]
    excerpt: string
}

const PostHeader = ({ type, title, coverImage, date, tags, excerpt }: Props) => {

    const { t } = useTranslation('blog');

    const postTypeNode = type === 'article' ?
        <Badge
            variant='filled'
            radius={'md'}
            color={'themeBlue.7'}
            size={'lg'}
        >{t('postTypeArticle')}</Badge> :
        <Badge
            variant='filled'
            radius={'md'}
            color={'themePurple.4'}
            size={'lg'}
        >{t('postTypeProject')}</Badge>;

    return (
        <Stack spacing={0} mb={'md'}>

            <MyTitle marginTop>
                <div>
                    {postTypeNode}
                </div>
                {title}
            </MyTitle>

            <Group>
                {
                    tags.map((tag, i) => (
                        <ILink key={i} url={toLink('blog', 'tag', tag)} type="internal" sx={{ textTransform: 'uppercase', fontSize: 18 }}>#{tag}</ILink>
                    ))
                }
            </Group>
            <Text size='lg'>Sebastian Schuler</Text>
            <Text size='lg'>
                <DateFormatter dateString={date} />
            </Text>
            <Divider mt={'md'} mb={'xs'} />
            <PostSharePanel title={title} />
            <Divider mb={'md'} mt={'xs'} />

            <Text>{excerpt}</Text>
        </Stack>
    )
}

export default PostHeader;
