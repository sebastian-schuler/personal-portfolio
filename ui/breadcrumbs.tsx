import { Breadcrumbs, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react'
import { toLink } from '../lib/util';
import ILink from './link';

interface Link {
    name: string;
    url: string;
}

const PageBreadcrumbs = () => {

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

        if (route.startsWith(toLink("blog", "[slug]"))) {

            const slug = query.slug as string;

            links.push({
                name: "Blog - " + slug,
                url: toLink("blog")
            });
        }
    }

    return (
        <div>
            <Breadcrumbs separator=">">
                {
                    links.map((link, i) => (
                        i !== links.length - 1 ? (
                            <ILink key={i} label={link.name} url={link.url} type="internal" />
                        ) : <Text key={i}>{link.name}</Text>
                    ))
                }
            </Breadcrumbs>
        </div>
    )
}

export default PageBreadcrumbs;