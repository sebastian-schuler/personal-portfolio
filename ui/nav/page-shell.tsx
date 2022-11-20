import { AppShell, useMantineTheme } from '@mantine/core';
import React from 'react';
import PageNav from './page-nav';

interface Props {
    children: React.ReactNode;
}

const PageShell: React.FC<Props> = ({ children }: Props) => {
    const theme = useMantineTheme();

    return (
        <AppShell
            padding="md"
            header={<PageNav />}
        // styles={(theme) => ({
        //     main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        // })}
        >
            {children}
        </AppShell>
    )
}

export default PageShell