import { Text, TypographyStylesProvider } from "@mantine/core"

type Props = {
    excerpt: string
    content: string
}

const ProjectBody = ({ excerpt, content }: Props) => {
    return (
        <>
            <Text mb={'lg'}>{excerpt}</Text>
            <TypographyStylesProvider>
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </TypographyStylesProvider>
        </>
    )
}

export default ProjectBody