import { Container, Sx } from '@mantine/core';
import React from 'react'

interface Props {
    children: React.ReactNode;
    sx?: Sx;
}

const PaddedContainer: React.FC<Props> = ({ children, sx }: Props) => {
    return (
        <Container size={"md"} px={'lg'} sx={{ ...sx }}>
            {children}
        </Container>
    )
}

export default PaddedContainer