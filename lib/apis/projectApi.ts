import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import ItemData from '../../interfaces/item-data';
import Tag from '../../interfaces/tag';
import Project from '../../interfaces/project';
import { arrSampleSize, clamp } from '../util';

const PROJECTS_PER_PAGE = 10;

interface SlugData {
    value: string;
    locales: string[];
}

// posts folder path
const projectsDirectory = join(process.cwd(), '_projects');

/**
 * Get all projects from the _projects folder
 * @returns - Array of post slugs
 */
export function getProjectSlugs(): SlugData[] {
    const dirents = fs.readdirSync(projectsDirectory, { withFileTypes: true });
    const projectDirectories = dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    let projects = projectDirectories.map((project) => {
        return { value: project, locales: getSlugLocales(project) };
    });

    projects = projects.filter(project => project.locales.length > 0);
    return projects;
}

interface GetProjectBySlugOptions {
    locale?: string;
}
/**
 * Get project data from markdown file
 * @param slug - post slug
 * @param fields - fields to return
 * @returns - typed post data
 */
export function getProjectBySlug(slug: string, fields: (keyof Project)[], options?: GetProjectBySlugOptions): Project {

    const availableLocales = getSlugLocales(slug);
    const prefLocale = options?.locale || 'en';

    const chosenLocale = availableLocales.includes(prefLocale) ? prefLocale : availableLocales[0];
    const fullPath = join(projectsDirectory, slug, `${chosenLocale}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // const realSlug = slug.replace(/\.md$/, '');
    const realSlug = slug;
    const { data, content } = matter(fileContents);

    // Required fields
    const items: Project = {
        slug: realSlug,
        date: data.date || '',
        title: data.title || '',
        tags: data.tags?.split(',') || [],
        coverImage: data.coverImage || '',
        excerpt: data.excerpt || '',
        locales: availableLocales,
        locale: chosenLocale,
        featured: data.featured || false,
    };

    // Optional fields
    if (fields.includes('content')) items.content = content;
    if (fields.includes('ogImage')) items.ogImage = data.ogImage || '';
    if (fields.includes('ogDesc')) items.ogDesc = data.ogDesc || '';
    if (fields.includes('githubUrl')) items.githubUrl = data.githubUrl || '';
    if (fields.includes('externalUrl')) items.externalUrl = data.externalUrl || '';

    return items;
}
/**
 * 
 * @param slug - post slug
 * @param fields - fields to return
 * @returns - raw post data, allows minimum transfered data
 */
function getProjectDataBySlug(slug: SlugData, fields: string[] = []) {

    const chosenLocale = slug.locales.includes("en") ? "en" : slug.locales[0];

    const fullPath = join(projectsDirectory, slug.value, `${chosenLocale}.md`);
    const realSlug = slug.value.replace(/\.md$/, '');

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items: ItemData = {}

    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })

    return items;
}

interface GetAllProjectsOptions {
    page?: number
    locale?: string;
}
/**
 * Get all projects
 * @param fields - Fields to include in the response
 * @returns - Array of projects
 */
export function getAllProjects(fields: (keyof Project)[], options?: GetAllProjectsOptions): Project[] {
    let slugs = getProjectSlugs();

    // If page is set, only load that specific page
    if (options?.page) {
        const page = options.page;

        let fromIndex = page === 1 ? 0 : (page - 1) * PROJECTS_PER_PAGE;
        let toIndex = page === 1 ? PROJECTS_PER_PAGE : page * PROJECTS_PER_PAGE;
        slugs = slugs.slice(fromIndex, toIndex);
    }

    const projects = slugs
        .map((slug) => getProjectBySlug(slug.value, fields, { locale: options?.locale }))
        // sort projects by date in descending order
        .sort((post1, post2) => {
            if (post1.featured && !post2.featured) {
                return -1
            } else if (!post1.featured && post2.featured) {
                return 1;
            } else {
                return post1.date > post2.date ? -1 : 1;
            }
        });
    return projects;
}

/**
 * Get all tags
 * @returns - Array of tags
 */
export function getAllProjectTags(): Tag[] {
    const slugs = getProjectSlugs();
    const tags = new Map<string, number>();

    // Get unique tags and count
    slugs.forEach((slug) => {
        const post = getProjectDataBySlug(slug, ['tags']);
        const projectTags = post.tags.split(',');
        projectTags.forEach((tag) => tags.set(tag, (tags.get(tag) || 0) + 1));
    });

    // Sort tags by count
    const arr = Array.from(tags, ([tag, count]) => ({ name: tag, count: count }));
    arr.sort((a, b) => (a.count > b.count ? -1 : 1));

    return arr;
}

interface GetPostsByTagOptions {
    locale?: string;
}
/**
 * Get all projects for a tag
 * @param tag - Tag to filter by
 * @param fields - Fields to return
 * @returns - Array of projects
 */
export function getProjectsByTag(tag: string, fields: (keyof Project)[], options?: GetPostsByTagOptions): Project[] {
    const allPosts = getAllProjects(fields, { locale: options?.locale });
    return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * 
 * @returns blog post count
 */
export function getProjectCount() {
    return getProjectSlugs().length;
}

/**
 * 
 * @returns blog page count, based on POSTS_PER_PAGE
 */
export function getProjectsPageCount() {
    return Math.ceil(getProjectCount() / PROJECTS_PER_PAGE);
}

/**
 * Get all existing locales for a slug
 * @param slug 
 * @returns 
 */
function getSlugLocales(slug: string) {
    const files = fs.readdirSync(join(process.cwd(), '_projects', slug));
    return files.map(name => name.replace(/\.md$/, ''));
}

/**
 * Get a number of recommended projects based on tags
 * @param slug 
 * @param tags 
 * @returns 
 */
export function getRecommendedProjects(slug: string, tags: string[]) {

    const allPosts = getAllProjects(['slug', 'tags', 'title', 'locales']);
    const matchingTags = allPosts.filter(p => p.tags.some(t => tags.includes(t)) && p.slug !== slug);
    const recommendedProjects = arrSampleSize(matchingTags, clamp(4, 0, matchingTags.length));

    // If there are not enough projects, fill the rest with random projects
    if (recommendedProjects.length < 4) {

        // Filter out projects that are already recommended
        const notSelected = allPosts.filter(p => !recommendedProjects.some(r => r.slug === p.slug));

        // Get random projects
        const randomProjects = arrSampleSize(notSelected, 4 - recommendedProjects.length);

        // Add random projects to recommended posts
        recommendedProjects.push(...randomProjects);
    }

    return recommendedProjects;
}