import { Anchor, Divider, Group, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import SharePanel from '../share-panel';
import DateFormatter from '../date-formatter';
import MyTitle from '../title';
import TableOfContents from '../table-of-contents';
import { HeaderData } from '../../lib/markdown/customMarkdownParser';

interface Props {
    title: string
    date: string
    headers: HeaderData[]
    githubUrl?: string | null
    appUrl?: string | null
}

const ProjectHeader: React.FC<Props> = ({ title, date, headers, githubUrl, appUrl }: Props) => {

    const { t } = useTranslation('portfolio');

    return (
        <>

            <MyTitle>{title}</MyTitle>

            <Group position="apart" align={'end'} mt={'sm'}>
                <Group spacing={'sm'}>
                    <Text size='md'><DateFormatter dateString={date} /></Text>
                    {githubUrl && <>•<Anchor href={githubUrl}>{t('projectOpenGithub')}</Anchor></>}
                    {appUrl && <>•<Anchor href={appUrl}>{t('projectOpenWebsite')}</Anchor></>}
                </Group>
                <SharePanel title={title} />
            </Group>

            <Divider mt={'md'} mb={'xl'} />

            <TableOfContents headers={headers} />

        </>
    )
}

export default ProjectHeader;