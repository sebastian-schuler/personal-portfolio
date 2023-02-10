import { Anchor, List, Text, useMantineTheme } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import { HeaderData } from '../lib/markdown/customMarkdownParser';

type Props = {
    headers: HeaderData[]
}

const TableOfContents: React.FC<Props> = ({ headers }: Props) => {

    const { t } = useTranslation('blog');
    const theme = useMantineTheme();
    let listNumber = 0;

    const getList = (data: HeaderData[], depth: number): JSX.Element => {

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
                const list = getList(newList, header.order);
                items.push(list);
                i = listUntil - 1;

            }
        }

        listNumber++;

        return <List key={"outer"+listNumber} withPadding={depth > 2 ? true : false} >
            {items.map((item, i) => item)}
        </List>
    }

    const items = getList(headers, 2);

    return (
        <div>
            <Text size={"lg"} color={theme.colorScheme === "dark" ? 'white' : theme.black}>{t("tableOfContents")}</Text>
            {items}
        </div>
    )
}

export default TableOfContents