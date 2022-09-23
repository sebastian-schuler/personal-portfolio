import { AppShell, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react'
import PageHeader from './PageHeader';

interface Props {
    children: React.ReactNode;
}

const PageShell:React.FC<Props> = ({children}:Props) => {
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

export default PageShell