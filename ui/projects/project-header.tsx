import { Divider, Group, Stack, Text } from '@mantine/core'
import React from 'react'
import { toLink } from '../../lib/util'
import PostSharePanel from '../blog/post-share-panel'
import DateFormatter from '../date-formatter'
import ILink from '../link'
import MyTitle from '../my-title'

type Props = {
    title: string
    coverImage: string
    date: string
    tags: string[]
}

const ProjectHeader = ({ title, coverImage, date, tags }: Props) => {

    return (
        <Stack spacing={0} mb={'md'}>
            <MyTitle marginTop>{title}</MyTitle>
            <Group>
                {
                    tags.map((tag, i) => (
                        <ILink key={i} url={toLink('projects', 'tag', tag)} type="internal" sx={{ textTransform: 'uppercase', fontSize: 18 }}>#{tag}</ILink>
                    ))
                }
            </Group>
            <Text size='lg'>Sebastian Schuler</Text>
            <Text size='lg'>
                <DateFormatter dateString={date} />
            </Text>
            <Divider mt={'md'} mb={'xs'} />
            <PostSharePanel title={title} />
            <Divider mb={'md'} mt={'xs'} />
        </Stack>
    )
}

export default ProjectHeader