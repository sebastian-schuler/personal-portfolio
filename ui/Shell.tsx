import { AppShell, useMantineTheme } from '@mantine/core';
import React from 'react';
import PageHeader from './Nav';

interface Props {
    children: React.ReactNode;
}

const Shell:React.FC<Props> = ({children}:Props) => {
    const theme = useMantineTheme();

    return (
        <AppShell
            padding="md"
            header={<PageHeader />}
            // styles={(theme) => ({
            //     main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            // })}
        >
            {children}
        </AppShell>
    )
}

export default Shell