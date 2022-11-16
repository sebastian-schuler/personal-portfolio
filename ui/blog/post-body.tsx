import { TypographyStylesProvider } from "@mantine/core"

type Props = {
    content: string
}

const PostBody = ({ content }: Props) => {
    return (
        <TypographyStylesProvider>
            <div
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </TypographyStylesProvider>
    )
}

export default PostBody