import html, { Root } from 'remark-html'
import { Content } from 'mdast'
import { Anchor, Code, Text, Title } from '@mantine/core'
import { Prism } from '@mantine/prism';
import { PrismProps } from '@mantine/prism/lib/Prism/Prism';

export const parseMarkdown = (markdown: Root) => {

    const root = <div>{handleNodeContent(markdown.children)}</div>;
    return root;
}

const handleNodeContent = (node: Content[]): JSX.Element => {

    const children: JSX.Element[] = [];

    for (const child of node) {

        if (child.type === 'heading') {
            children.push(
                <Title order={child.depth} mt={"lg"} mb={"xs"}>
                    {handleNodeContent(child.children)}
                </Title>
            );

        } else if (child.type === "paragraph") {
            children.push(
                <Text>
                    {handleNodeContent(child.children)}
                </Text>
            );

        } else if (child.type === "code") {
            const language = child.lang as PrismProps["language"];

            children.push(
                <Prism
                    withLineNumbers
                    language={language}
                    my={"md"}
                    styles={(theme) => ({
                        lineContent: {
                            paddingLeft: 8,
                        },
                    })}
                >
                    {child.value}
                </Prism>
            )

        } else if (child.type === "inlineCode") {
            children.push(
                <Code sx={{ fontSize: 14 }}>{child.value}</Code>
            )

        } else if (child.type === "emphasis") {
            children.push(
                <>
                    {handleNodeContent(child.children)}
                </>
            )

        } else if (child.type === "strong") {
            children.push(
                <Text weight={"bold"} size={'lg'}>
                    {handleNodeContent(child.children)}
                </Text>
            )

        } else if (child.type === "link") {
            children.push(
                <Anchor href={child.url}>
                    {handleNodeContent(child.children)}
                </Anchor>
            )

        } else if (child.type === "text") {
            children.push(
                <>{child.value}</>
            );

        } else {
            console.log(child)
        }
    }

    return <>{children}</>;
}