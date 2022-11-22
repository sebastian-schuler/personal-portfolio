import { Breadcrumbs, createStyles, Divider, Group, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react'
import { toLink } from '../lib/util';
import ILink from './link';

interface Link {
    name: string;
    url: string;
}

interface Props {
    postTitle?: string;
}

const PageBreadcrumbs = ({ postTitle }: Props) => {

    const router = useRouter();
    const query = router.query;
    const route = router.route;

    const links: Link[] = [];

    links.push({ name: "Home", url: "/" });

    if (route.startsWith(toLink("blog"))) {
        // BLOG PATH
        links.push({
            name: "Blog",
            url: toLink("blog")
        });

        if (route.startsWith(toLink("blog", 'post', "[PostSlug]"))) {
            // BLOG POST PATH
            const slug = postTitle ? postTitle : query.PostSlug as string;
            links.push({
                name: slug,
                url: toLink("#")
            });
        }

        if (route.startsWith(toLink("blog", 'tag', "[TagSlug]"))) {
            // BLOG TAG PATH
            const slug = query.TagSlug as string;
            links.push({
                name: 'Tag: '+slug.toUpperCase(),
                url: toLink("#")
            });
        }
    }

    return (
        <>
            <Group position='apart' mb={2}>
                <Breadcrumbs separator=">">
                    {
                        links.map((link, i) => (
                            i !== links.length - 1 ? (
                                <ILink
                                    key={i}
                                    url={link.url}
                                    type="internal"
                                >
                                    {link.name}
                                </ILink>
                            ) : (
                                <Text
                                    key={i}
                                    sx={{ letterSpacing: 0.7 }}
                                >
                                    {link.name}
                                </Text>
                            )
                        ))
                    }
                </Breadcrumbs>
            </Group>
        </>
    )
}

export default PageBreadcrumbs;