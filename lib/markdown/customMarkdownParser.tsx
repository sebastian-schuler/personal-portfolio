import html, { Root } from 'remark-html'
import { Content } from 'mdast'
import { Anchor, Box, Code, createStyles, Group, Text, Title } from '@mantine/core'
import { Prism } from '@mantine/prism';
import { PrismProps } from '@mantine/prism/lib/Prism/Prism';
import { IconListSearch } from '@tabler/icons';
import { escape } from 'querystring';

type HeaderData = {
    link: string;
    title: string;
    order: number;
}

const useStylesTableOfContents = createStyles((theme) => ({
    link: {
        ...theme.fn.focusStyles(),
        display: 'block',
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        lineHeight: 1.2,
        fontSize: theme.fontSizes.md,
        padding: theme.spacing.xs,
        borderTopRightRadius: theme.radius.sm,
        borderBottomRightRadius: theme.radius.sm,
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        fontWeight: 500,
        borderLeftColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 6 : 7],
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 2 : 7],

        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
        },
    },

    header: {
        scrollMarginTop: 160,

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            scrollMarginTop: 100,
        },
    },
}));

export class MarkdownParser {

    private headers: HeaderData[];

    constructor() {
        this.headers = [];
    }

    parseMarkdown(markdown: Root) {
        const rootChildren = this.handleNodeContent(markdown.children);

        const root = <div>{this.createTableOfContents()}{rootChildren}</div>;
        return root;
    }

    private handleNodeContent(node: Content[]): JSX.Element {

        const children: JSX.Element[] = [];

        for (const child of node) {

            if (child.type === 'heading') {

                const { classes } = useStylesTableOfContents();
                const title = this.handleNodeContent(child.children).props.children[0].props.children;
                const link = encodeURIComponent(title);

                this.headers.push({ title: title, order: child.depth, link: link });
                children.push(
                    <Title id={link} order={child.depth} mt={"lg"} mb={"xs"} className={classes.header}>
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

    private createTableOfContents = (): JSX.Element => {

        if (!this.headers) return <></>;

        const { classes, cx } = useStylesTableOfContents();

        const items = this.headers.map((header) => (
            <Box<'a'>
                component="a"
                href={'#' + header.link}
                key={header.link}
                className={cx(classes.link, /* { [classes.linkActive]: active === item.link } */)}
                sx={(theme) => ({ paddingLeft: (header.order - 1) * theme.spacing.lg })}
            >
                {header.title}
            </Box>
        ));

        return (
            <Box mb={'lg'}>
                <Group mb="md">
                    <IconListSearch size={18} stroke={1.5} />
                    <Text size={"lg"} weight={"bold"}>Table of contents</Text>
                </Group>
                {items}
            </Box>
        )
    }
}

{/* <>
                {
                    this.headers.map((header, index) => (
                        <Anchor href={"#"} key={index}>
                            {header.title}
                        </Anchor>
                    ))
                }
            </> */}