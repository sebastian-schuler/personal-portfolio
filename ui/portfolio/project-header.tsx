import { Anchor, Divider, Group, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import PostSharePanel from '../blog/post-share-panel';
import DateFormatter from '../date-formatter';
import MyTitle from '../title';

interface Props {
    title: string
    date: string
    githubUrl?: string | null
    appUrl?: string | null
}

const ProjectHeader: React.FC<Props> = ({ title, date, githubUrl, appUrl }: Props) => {

    const { t } = useTranslation('portfolio');

    return (
        <>

            <MyTitle>{title}</MyTitle>

            <Group position="apart" align={'end'} mt={'sm'}>
                <Group spacing={'sm'}>
                    <Text size='md'><DateFormatter dateString={date} /></Text>
                    {githubUrl && <>•<Anchor href={githubUrl}>Open Github repository</Anchor></>}
                    {appUrl && <>•<Anchor href={appUrl}>Open app</Anchor></>}
                </Group>
                <PostSharePanel title={title} />
            </Group>

            <Divider mt={'md'} mb={'xl'} />

        </>
    )
}

export default ProjectHeader;