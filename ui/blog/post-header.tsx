import { Badge, Box, Divider, Group, Text, useMantineTheme } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import { HeaderData } from "../../lib/markdown/customMarkdownParser"
import DateFormatter from "../date-formatter"
import TableOfContents from "../table-of-contents"
import MyTitle from "../title"
import SharePanel from "../share-panel"

type Props = {
    title: string
    coverImage: string
    date: string
    tags: string[]
    excerpt: string
    readTime: number
    headers: HeaderData[]
}

const PostHeader = ({ title, coverImage, date, tags, excerpt, readTime, headers }: Props) => {

    const { t } = useTranslation('blog');
    const theme = useMantineTheme();

    const postTags = <Group spacing={'sm'}>
        {
            tags.map((tag, i) => (
                <Badge
                    key={i}
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
                <SharePanel title={title} />
            </Group>

            <Divider my={'md'} />

            <Box mb={'md'}>
                <Text size={'lg'} color={theme.colorScheme === "dark" ? 'white' : theme.black}>Excerpt</Text>
                <Text>{excerpt}</Text>
            </Box>

            <TableOfContents headers={headers} />

            <Divider my={'md'} />

        </Box>
    )
}

export default PostHeader;
