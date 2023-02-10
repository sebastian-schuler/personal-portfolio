import { Anchor, Container, Divider, Group, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import React from 'react'
import PostSharePanel from '../blog/post-share-panel';
import PageBreadcrumbs from '../breadcrumbs';
import DateFormatter from '../date-formatter';
import MyTitle from '../title';

interface Props {
    children: React.ReactNode
    title: string
    date: string
    githubUrl?: string | null
    appUrl?: string | null
}

const PortfolioContainer: React.FC<Props> = ({ children, title, date, githubUrl, appUrl }: Props) => {

    const { t } = useTranslation('portfolio');

    return (
        <Container>

            <PageBreadcrumbs projectTitle={title} />

            <Head>
                <title>{t("portfolioItemTabTitle", { title: title })}</title>
                {/* <meta name='description' content={getMetaDescription(post.excerpt)} />
              <meta property='og:title' content={post.title} />
              <meta property='og:description' content={post.ogDesc} />
              <meta property='og:url' content={`${PAGE_URL}/${localePart}blog/${post.slug}`} />
              {post.ogImage && <meta property="og:image" content={post.ogImage.url} />} */}
            </Head>

            <MyTitle>{title}</MyTitle>

            <Group position="apart" align={'end'} mt={'sm'}>
                <Group spacing={'sm'}>
                    <Text size='md'><DateFormatter dateString={date} /></Text>
                    {githubUrl && <>•<Anchor href={githubUrl}>Open Github repository</Anchor></>}
                    {appUrl && <>•<Anchor href={appUrl}>Open app</Anchor></>}
                </Group>
                <PostSharePanel title={title} />
            </Group>

            <Divider my={'md'} />

            {children}
        </Container>
    )
}

export default PortfolioContainer;