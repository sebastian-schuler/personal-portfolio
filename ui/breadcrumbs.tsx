import { Breadcrumbs, createStyles, Group, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { toLink } from '../lib/util';
import ILink from './link';

const useStyles = createStyles((theme) => {

    return {
        root: {
            alignItems: 'baseline'
        },
        separator: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
        breadcrumb: {
            whiteSpace: 'pre-wrap'
        }
    };
});

interface Link {
    name: string;
    url: string;
}

interface Props {
    postTitle?: string;
    projectTitle?: string;
}

const PageBreadcrumbs = ({ postTitle, projectTitle }: Props) => {

    const { t } = useTranslation('common');
    const router = useRouter();
    const { classes, theme } = useStyles();
    const query = router.query;
    const route = router.route;

    const links: Link[] = [];

    links.push({
        name: t("breadcrumbs.home"),
        url: "/"
    });

    if (route.startsWith(toLink("blog"))) {
        // BLOG PATH
        links.push({
            name: t("breadcrumbs.blog"),
            url: toLink("blog")
        });

        if (route.startsWith(toLink("blog", "[PostSlug]"))) {
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
                name: '#' + slug.toUpperCase(),
                url: toLink("#")
            });
        }
    } else if (route.startsWith(toLink("portfolio"))) {
        // BLOG PATH
        links.push({
            name: t("breadcrumbs.portfolio"),
            url: toLink("portfolio")
        });

    } else if (route.startsWith(toLink("contact"))) {
        // CONTACT PATH
        links.push({
            name: t("breadcrumbs.contact"),
            url: toLink("contact")
        });

    }

    return (
        <Group position='apart' mb={theme.spacing.lg} pt={theme.spacing.lg}>
            <Breadcrumbs separator=">" classNames={{ root: classes.root, separator: classes.separator, breadcrumb: classes.breadcrumb }}>
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
    )
}

export default PageBreadcrumbs;