import { Divider, Group, Stack, Text } from "@mantine/core"
import { toLink } from "../../lib/util"
import DateFormatter from "../date-formatter"
import ILink from "../link"
import MyTitle from "../my-title"
import PostSharePanel from "./post-share-panel"

type Props = {
    title: string
    coverImage: string
    date: string
    tags: string[]
    excerpt: string
}

const PostHeader = ({ title, coverImage, date, tags, excerpt }: Props) => {

    return (
        <Stack spacing={0} mb={'md'}>
            <MyTitle marginTop>{title}</MyTitle>
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
