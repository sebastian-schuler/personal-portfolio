import { Anchor, Box, Code, Divider, List, Table, Text, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { PrismProps } from '@mantine/prism/lib/Prism/Prism';
import { Content } from 'mdast';
import { Root } from 'remark-html';

export type HeaderData = {
    link: string;
    title: string;
    order: number;
}

type HandleOptions = undefined | { type: 'th', index: number } | { type: 'td', index: number } | { type: 'tr', index: number };

export class MarkdownParser {

    private headers: HeaderData[];

    constructor() {
        this.headers = [];
    }

    getHeaders() {
        return this.headers;
    }

    /**
     * Render an entire markdown file using Mantine components
     * @param md 
     * @returns 
     */
    renderMarkdown(md: Root) {
        const rootChildren = this.handleMany(md.children);
        return <div>{rootChildren}</div>;
    }

    /**
     * Create multiple mantine components from nodes
     * @param nodes - Markdown as syntax tree nodes
     * @returns Box of mantine components
     */
    private handleMany(nodes: Content[]): JSX.Element[] {
        return nodes.map((x, ix) => {
            return <Box key={ix} sx={{ display: 'inline' }}>{this.handle(x)}</Box>
        });
    }

    /**
     * Create a mantine component from node
     * @param node  - Markdown as syntax tree node
     * @returns Mantine component as JSX
     */
    private handle(node: Content, options?: HandleOptions): JSX.Element {

        if (node.type === 'heading') {
            const title = node.children.find(x => x.type == "text");
            let link = '';
            if (title && title.type === "text") {
                link = encodeURIComponent(title.value);
                this.headers.push({ title: title.value, order: node.depth, link: link });
            }

            return (
                <>
                    <Title id={link} order={node.depth} mt={"lg"} mb={"sm"} sx={{ scrollMarginTop: 100 }}>
                        {this.handleMany(node.children)}
                    </Title>
                    <Divider mb={'md'} />
                </>
            );

        } else if (node.type === "paragraph") {
            return (
                <Text>
                    {this.handleMany(node.children)}
                </Text>
            );

        } else if (node.type === "code") {
            const language = node.lang as PrismProps["language"];

            return (
                <Prism
                    withLineNumbers
                    language={language}
                    my={"md"}
                    styles={(theme) => ({
                        lineContent: {
                            paddingLeft: theme.spacing.xs,
                        },
                    })}
                >
                    {node.value}
                </Prism>
            )

        } else if (node.type === "list") {
            return (
                <List type={node.ordered ? "ordered" : "unordered"}>
                    {
                        node.children.map((x, i) => {
                            return <List.Item key={i}>{this.handleMany(x.children)}
                            </List.Item>
                        })
                    }
                </List>
            )

        } else if (node.type === "inlineCode") {
            return (
                <Code sx={{ fontSize: 14 }}>{node.value}</Code>
            )

        } else if (node.type === "emphasis") {
            return (
                <>
                    {this.handleMany(node.children)}
                </>
            )

        } else if (node.type === "strong") {
            return (
                <Text component='span' weight={"bold"} size={'lg'}>
                    {this.handleMany(node.children)}
                </Text>
            )

        } else if (node.type === "link") {
            return (
                <Anchor href={node.url} target={'_blank'}>
                    {this.handleMany(node.children)}
                </Anchor>
            )

        } else if (node.type === "text") {
            return (
                <>{node.value}</>
            );

        } else if (node.type === "table") {

            const ths = node.children[0].children.map((x, i) => this.handle(x, { type: 'th', index: i }));
            const tds = node.children.slice(1).map((x, i) => {
                return this.handle(x, { type: 'tr', index: i });
            });

            return (
                <Box>
                    <Table horizontalSpacing="md" verticalSpacing="md" fontSize="md" withColumnBorders withBorder sx={{ width: 'fit-content' }}>
                        <thead>
                            <tr>
                                {ths}
                            </tr>
                        </thead>
                        <tbody>
                            {tds}
                        </tbody>
                    </Table>
                </Box>
            );

        } else if (node.type === "tableRow") {

            if (options && options.type === "tr") {
                return (
                    <tr key={options.index}>
                        {
                            node.children.map((x, i) => {
                                return this.handle(x, { type: 'td', index: i })
                            })
                        }
                    </tr>
                );
            }

        } else if (node.type === "tableCell") {

            if (options && options.type === "th") {
                // Table header
                return <th key={options.index} style={{ color: 'white' }}>
                    {this.handleMany(node.children)}
                </th>

            } else if (options && options.type === "td") {
                // Table cell
                return <td key={options.index}>
                    {this.handleMany(node.children)}
                </td>
            }

        } else {
            console.log("ERROR", node)
        }

        return <b>TODO element fehlt: {node.type}</b>
    }
}