import { Anchor, Box, Divider, Group, List, Text, useMantineTheme } from '@mantine/core';
import { IconListSearch } from '@tabler/icons';
import useTranslation from 'next-translate/useTranslation';
import { HeaderData } from '../lib/markdown/customMarkdownParser';

type Props = {
    headers: HeaderData[]
}

const TableOfContents = ({ headers }: Props) => {

    const { t } = useTranslation('blog');
    const theme = useMantineTheme();

    const getList = (data: HeaderData[], depth: number, listNumber: number): JSX.Element => {

        let items: JSX.Element[] = [];

        for (let i = 0; i < data.length; i++) {

            const header = data[i];

            if (header.order === depth) {
                items.push(
                    <List.Item key={i}>
                        <Anchor href={`#${header.link}`}>
                            {header.title}
                        </Anchor>
                    </List.Item>
                );

            } else {
                let listUntil = i;
                while (listUntil < data.length && data[listUntil].order >= header.order) {
                    listUntil++;
                }
                const newList = data.slice(i, listUntil);
                const list = getList(newList, header.order, listNumber + 1);
                items.push(list);
                i = listUntil - 1;

            }
        }

        return <List key={listNumber} withPadding={depth > 2 ? true : false}>
            {items.map((item, i) => item)}
        </List>
    }

    const items = getList(headers, 2, 1);

    return (
        <Box>
            <Text size={"lg"} color={theme.colorScheme === "dark" ? 'white' : theme.black}>{t("tableOfContents")}</Text>
            {items}
        </Box>
    )
}

export default TableOfContents