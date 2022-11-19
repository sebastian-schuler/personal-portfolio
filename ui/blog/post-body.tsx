import { Text, Title, TypographyStylesProvider } from "@mantine/core"

type Props = {
    excerpt: string
    content: string
}

const PostBody = ({ excerpt, content }: Props) => {
    return (
        <>
            <Text>{excerpt}</Text>
            <TypographyStylesProvider>
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </TypographyStylesProvider>
        </>
    )
}

export default PostBody