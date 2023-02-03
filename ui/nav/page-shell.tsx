import { AppShell } from '@mantine/core';
import React from 'react';
import PageNavContainer from './page-nav';

interface Props {
    children: React.ReactNode;
}

const PageShell: React.FC<Props> = ({ children }: Props) => {

    return (
        <AppShell
            padding={0}
            header={<PageNavContainer />}
        >
            {children}
        </AppShell>
    )
}

export default PageShell