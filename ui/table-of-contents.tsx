import { Box, createStyles, Divider, Group, Text } from '@mantine/core'
import { IconListSearch } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import { HeaderData } from '../lib/markdown/customMarkdownParser'

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
}));

type Props = {
    headers: HeaderData[]
}

const TableOfContents = ({ headers }: Props) => {

    const { classes } = useStylesTableOfContents();
    const { t } = useTranslation('common');

    const items = headers.map((header, i) => (
        <Box<'a'>
            component="a"
            href={'#' + header.link}
            key={header.link + i}
            className={classes.link}
            sx={(theme) => ({ paddingLeft: (header.order - 1) * theme.spacing.lg })}
        >
            {header.title}
        </Box>
    ));

    return (
        <Box mb={'lg'}>
            <Divider mb={'lg'} />
            <Group mb="md">
                <IconListSearch size={24} stroke={1.5} />
                <Text size={"lg"} weight={"bold"} color={'white'}>{t("post.tableOfContents")}</Text>
            </Group>
            {items}
            <Divider mt={'lg'} />
        </Box>
    )
}

export default TableOfContents