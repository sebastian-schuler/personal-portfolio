import { AppShell } from '@mantine/core';
import React from 'react';
import PageNavContainer from './page-nav';

interface Props {
    logoFont: string
    children: React.ReactNode;
}

const PageShell: React.FC<Props> = ({ children, logoFont }: Props) => {

    return (
        <AppShell padding={0} header={<PageNavContainer logoFont={logoFont} />}>
            {children}
        </AppShell>
    )
}

export default PageShell