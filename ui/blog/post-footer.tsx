import { Divider, Space, Title } from '@mantine/core';
import React from 'react'

const PostFooter = () => {
    return (
        <>
            <Divider mt={'lg'} mb={'lg'} />

            <Title order={2}>Other Posts you might be interested in</Title>

            <Space h={"xl"} />
        </>
    )
}

export default PostFooter;