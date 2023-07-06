import { Anchor, Box, Code, Divider, Image as MantineImage, List, MantineTheme, Table, Text, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { PrismProps } from '@mantine/prism/lib/Prism/Prism';
import { Content } from 'mdast';
import { Root } from 'remark-html';
import Image from 'next/image';


export type HeaderData = {
    link: string;
    title: string;
    order: number;
}

type HandleOptions = undefined | { type: 'th', index: number } | { type: 'td', index: number } | { type: 'tr', index: number };

export class MarkdownParser {

    private headers: HeaderData[];
    private theme: MantineTheme;

    constructor(theme: MantineTheme) {
        this.headers = [];
        this.theme = theme;
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
            const { node, options } = this.handle(x);

            if (options === "image") {
                return <Box key={ix} sx={{ textAlign: "center" }}>{node}</Box>
            }

            return <Box key={ix} sx={{ display: 'inline' }}>{node}</Box>
        });
    }

    /**
     * Create a mantine component from node
     * @param node  - Markdown as syntax tree node
     * @returns Mantine component as JSX
     */
    private handle(node: Content, options?: HandleOptions): { node: JSX.Element, options?: string } {

        if (node.type === 'heading') {
            const title = node.children.find(x => x.type == "text");
            let link = '';
            if (title && title.type === "text") {
                link = encodeURIComponent(title.value);
                this.headers.push({ title: title.value, order: node.depth, link: link });
            }

            return ({
                node:
                    <>
                        <Title id={link} order={node.depth} mt={"lg"} mb={"sm"} sx={{ scrollMarginTop: 100 }}>
                            {this.handleMany(node.children)}
                        </Title>
                        {node.depth <= 2 && <Divider mb={'md'} />}
                    </>
            });

        } else if (node.type === "paragraph") {
            return ({
                node:
                    <Text mb={'sm'}>
                        {this.handleMany(node.children)}
                    </Text>
            });

        } else if (node.type === "code") {
            const language = node.lang as PrismProps["language"];

            return ({
                node:
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
            })

        } else if (node.type === "list") {
            return ({
                node:
                    <List type={node.ordered ? "ordered" : "unordered"}>
                        {
                            node.children.map((x, i) => {
                                return <List.Item key={i}>{this.handleMany(x.children)}
                                </List.Item>
                            })
                        }
                    </List>
            })

        } else if (node.type === "inlineCode") {
            return ({
                node:
                    <Code sx={{ fontSize: 14 }}>{node.value}</Code>
            })

        } else if (node.type === "emphasis") {
            return ({
                node:
                    <>
                        {this.handleMany(node.children)}
                    </>
            })

        } else if (node.type === "strong") {
            return ({
                node:
                    <Text
                        component='span'
                        weight={'bold'}
                        size={'lg'}
                        color={this.theme.colorScheme === "dark" ? "white" : "black"}
                    >
                        {this.handleMany(node.children)}
                    </Text>
            })

        } else if (node.type === "link") {
            return ({
                node:
                    <Anchor href={node.url} target={'_blank'}>
                        {this.handleMany(node.children)}
                    </Anchor>
            })

        } else if (node.type === "text") {
            return ({
                node:
                    <>{node.value}</>
            });

        } else if (node.type === "table") {

            const ths = node.children[0].children.map((x, i) => this.handle(x, { type: 'th', index: i }).node);
            const tds = node.children.slice(1).map((x, i) => {
                return this.handle(x, { type: 'tr', index: i }).node;
            });

            const resultNode = <Box>
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
            </Box>;

            return ({ node: resultNode });

        } else if (node.type === "tableRow") {

            if (options && options.type === "tr") {
                return ({
                    node:
                        <tr key={options.index}>
                            {
                                node.children.map((x, i) => {
                                    return this.handle(x, { type: 'td', index: i }).node
                                })
                            }
                        </tr>
                });
            }

        } else if (node.type === "tableCell") {

            if (options && options.type === "th") {
                // Table header
                return ({
                    node:
                        <th
                            key={options.index}
                            style={{
                                color: this.theme.colorScheme === "dark" ? "white" : "black",
                                backgroundColor: this.theme.colorScheme === "dark" ? this.theme.colors.dark[8] : this.theme.colors.gray[3],
                            }}
                        >
                            {this.handleMany(node.children)}
                        </th>
                })

            } else if (options && options.type === "td") {
                // Table cell
                return ({
                    node:
                        <td key={options.index}>
                            {this.handleMany(node.children)}
                        </td>
                })
            }

        } else if (node.type === "image") {

            if (node.url.startsWith("http")) {
                // External image

                return ({
                    node:
                        <Box display={"inline-block"} sx={{ textAlign: 'center', margin: `2rem 0` }}>
                            <MantineImage src={node.url} alt={node.alt || ""} />
                        </Box>,
                    options: "image"
                });

            } else if (node.url.startsWith("/")) {
                // Internal image

                return ({
                    node:
                        <Box display={"inline-block"} sx={{ textAlign: 'center', margin: `2rem 0` }}>
                            <Image
                                src={node.url}
                                alt={node.alt || ""}
                                width="0"
                                height="0"
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Box>,
                    options: "image"
                });
            } else {
                console.log("Error: Couldn't create image; Wrong path", node)
            }

        } else if (node.type === "html") {
            console.log("HTML", node);

        } else {
            console.log("ERROR", node)

        }

        return ({ node: <b>TODO element fehlt: {node.type}</b> })
    }
}