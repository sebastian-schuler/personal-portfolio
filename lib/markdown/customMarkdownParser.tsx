import { Anchor, Code, createStyles, Text, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { PrismProps } from '@mantine/prism/lib/Prism/Prism';
import { Content } from 'mdast';
import { Root } from 'remark-html';
import TableOfContents from '../../ui/tableOfContents';

export type HeaderData = {
    link: string;
    title: string;
    order: number;
}

export class MarkdownParser {

    private headers: HeaderData[];

    constructor() {
        this.headers = [];
    }

    getHeaders() {
        return this.headers;
    }

    parseMarkdown(markdown: Root) {
        const rootChildren = this.handleNodeContent(markdown.children);

        const root = <div>{rootChildren}</div>;
        return root;
    }

    private handleNodeContent(node: Content[]): JSX.Element {

        const children: JSX.Element[] = [];

        for (const child of node) {

            if (child.type === 'heading') {

                const title = this.handleNodeContent(child.children).props.children[0].props.children;
                const link = encodeURIComponent(title);

                this.headers.push({ title: title, order: child.depth, link: link });
                children.push(
                    <Title id={link} order={child.depth} mt={"lg"} mb={"xs"} sx={{scrollSnapMarginTop: 100}}>
                        {title}
                    </Title>
                );

            } else if (child.type === "paragraph") {
                children.push(
                    <Text>
                        {this.handleNodeContent(child.children)}
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
                        {this.handleNodeContent(child.children)}
                    </>
                )

            } else if (child.type === "strong") {
                children.push(
                    <Text weight={"bold"} size={'lg'}>
                        {this.handleNodeContent(child.children)}
                    </Text>
                )

            } else if (child.type === "link") {
                children.push(
                    <Anchor href={child.url}>
                        {this.handleNodeContent(child.children)}
                    </Anchor>
                )

            } else if (child.type === "text") {
                children.push(
                    <>{child.value}</>
                );

            } else {
                /* console.log(child) */
            }
        }

        return <>{children}</>;
    }
}