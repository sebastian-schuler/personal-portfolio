import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react'
import Project from '../../interfaces/project';
import { getAllProjects, getProjectBySlug } from '../../lib/apis/projectApi';
import markdownToHtml from '../../lib/markdown/markdownToHtml';
import ErrorPage from 'next/error'
import useTranslation from 'next-translate/useTranslation';
import { Container } from '@mantine/core';
import PageBreadcrumbs from '../../ui/breadcrumbs';
import MyTitle from '../../ui/my-title';
import Head from 'next/head';
import { getMetaDescription } from '../../lib/seoTools';
import { formatDate } from '../../lib/util';
import { PAGE_URL } from '../../lib/constants';
import ProjectHeader from '../../ui/projects/project-header';
import ProjectBody from '../../ui/projects/project-body';

type Props = {
    project: Project
}

const ProjectPage: React.FC<Props> = ({ project }) => {

    const router = useRouter()
    if (!router.isFallback && !project?.slug) {
        return <ErrorPage statusCode={404} />
    }

    const { t, lang } = useTranslation('projects');
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";

    return (
        <Container>
            <PageBreadcrumbs projectTitle={project.title} />


            {router.isFallback ? (
                <MyTitle>Loading...</MyTitle>
            ) : (
                <>
                    <article>

                        <Head>
                            <title>{t("projectTabTitle", { title: project.title, date: formatDate(project.date, lang), tags: project.tags.join(', ') })}</title>
                            <meta name='description' content={getMetaDescription(project.excerpt)} />

                            <meta property='og:title' content={project.title} />
                            <meta property='og:description' content={project.ogDesc} />
                            <meta property='og:url' content={`${PAGE_URL}/${localePart}projects/${project.slug}`} />
                            {project.ogImage && <meta property="og:image" content={project.ogImage.url} />}
                        </Head>

                        <ProjectHeader
                            title={project.title}
                            coverImage={project.coverImage}
                            date={project.date}
                            tags={project.tags}
                            locales={project.locales}
                        />
                        <ProjectBody
                            excerpt={project.excerpt}
                            content={project.content || ""}
                        />
                    </article>
                </>
            )}
        </Container>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {

    const slug = context.params?.ProjectSlug as string

    const project = getProjectBySlug(slug, [
        'title',
        'date',
        'slug',
        'content',
        'ogImage',
        'ogDesc',
        'coverImage',
        'tags',
    ], { locale: context.locale });

    const content = await markdownToHtml(project.content || '');

    return {
        props: {
            project: {
                ...project,
                content,
            },
        },
        revalidate: 600, // In seconds
    }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {

    const projects = getAllProjects(['slug']);

    let paths: {
        params: ParsedUrlQuery;
        locale?: string | undefined;
    }[] = [];

    locales?.forEach(locale => {
        projects.forEach(project => {
            paths.push({
                params: {
                    ProjectSlug: project.slug,
                },
                locale: locale,
            })
        })
    });

    return {
        paths: paths,
        fallback: false,
    }
}

export default ProjectPage