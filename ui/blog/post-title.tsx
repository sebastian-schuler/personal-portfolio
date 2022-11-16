import { Title } from '@mantine/core'
import React from 'react'

interface Props {
    children: React.ReactNode
}
const PostTitle: React.FC<Props> = ({ children }: Props) => {
    return (
        <Title order={1}>{children}</Title>
    )
}

export default PostTitle;