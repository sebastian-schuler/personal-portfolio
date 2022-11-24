import { Title } from '@mantine/core'
import React from 'react'

interface Props {
    children: React.ReactNode
    isTag?: boolean
    marginBottom?: boolean
    marginTop?: boolean
}
const MyTitle: React.FC<Props> = ({ children, isTag, marginBottom, marginTop }: Props) => {
    return (
        <Title order={1} mb={marginBottom ? 'lg' : 0} mt={marginTop ? 'lg' : 0} sx={{ textTransform: isTag ? 'uppercase' : 'none' }}>{isTag && '#'}{children}</Title>
    )
}

export default MyTitle;