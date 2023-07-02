import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { ItemData, Post, Tag } from '../../types/blog';
import { arrSampleSize, clamp } from '../util';
import { Project } from '../../types/portfolio';

interface SlugData {
    value: string;
    locales: string[];
}

// Project folder path
const directoryName = 'portfolio';
const projectDirectory = join(process.cwd(), '_data', directoryName);

/**
 * Get all projects from the portfolio folder
 * @returns - Array of project slugs
 */
export function getProjectSlugs(): SlugData[] {

    // Get file and folder names
    const dirents = fs.readdirSync(projectDirectory, { withFileTypes: true });
    // Filter out non-directories
    const projectDirectories = dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    let projects = projectDirectories.map((projectDirectory) => {
        return { value: projectDirectory, locales: getSlugLocales(projectDirectory) };
    });
    projects = projects.filter(project => project.locales.length > 0);

    return projects;
}

interface GetProjectBySlugOptions {
    locale?: string;
}
/**
 * Get post data from markdown file
 * @param slug - post slug
 * @param fields - fields to return
 * @returns - typed post data
 */
export function getProjectBySlug(slug: string, fields: (keyof Project)[], options?: GetProjectBySlugOptions): Project {

    const availableLocales = getSlugLocales(slug);
    const prefLocale = options?.locale || 'en';

    const chosenLocale = availableLocales.includes(prefLocale) ? prefLocale : availableLocales[0];
    const fullPath = join(projectDirectory, slug, `${chosenLocale}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // const realSlug = slug.replace(/\.md$/, '');
    const realSlug = slug;
    const { data, content } = matter(fileContents);

    let items: Project | undefined = undefined;

    items = {
        slug: realSlug,
        date: data.date || '',
        title: data.title || '',
        tags: data.tags?.split(',') || [],
        coverImage: data.coverImage || '',
        excerpt: data.excerpt || '',
        featured: data.featured || false,
        githubUrl: data.githubUrl || '',
        appUrl: data.appUrl || '',
    };

    if (!items) {
        throw new Error(`Invalid post type: ${fullPath}`);
    }

    // Optional fields
    if (fields.includes('content')) items.content = content;
    if (fields.includes('ogImage')) items.ogImage = data.ogImage || '';
    if (fields.includes('ogDesc')) items.ogDesc = data.ogDesc || '';

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

    const fullPath = join(projectDirectory, slug.value, `${chosenLocale}.md`);
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
    locale?: string;
}
/**
 * Get all projects
 * @param fields - Fields to include in the response
 * @returns - Array of projects
 */
export function getAllProjects(fields: (keyof Project)[], options?: GetAllProjectsOptions): Project[] {
    let slugs = getProjectSlugs();

    const posts = slugs
        .map((slug) => getProjectBySlug(slug.value, fields, { locale: options?.locale }))
        // sort posts by date in descending order
        .sort((post1, post2) => {
            if(post1.featured && !post2.featured) return -1;
            if(!post1.featured && post2.featured) return 1;
            return post1.date > post2.date ? -1 : 1;
        });
    return posts;
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
        const postTags = post.tags.split(',');
        postTags.forEach((tag) => tags.set(tag, (tags.get(tag) || 0) + 1));
    });

    // Sort tags by count
    const arr = Array.from(tags, ([tag, count]) => ({ name: tag, count: count }));
    arr.sort((a, b) => (a.count > b.count ? -1 : 1));

    return arr;
}

// interface GetPostsByTagOptions {
//     locale?: string;
// }
// /**
//  * Get all posts for a tag
//  * @param tag - Tag to filter by
//  * @param fields - Fields to return
//  * @returns - Array of posts
//  */
// export function getPostsByTag(tag: string, fields: (keyof Project)[], options?: GetPostsByTagOptions): Project[] {
//     const allPosts = getAllProjects(fields, { locale: options?.locale });
//     return allPosts.filter((post) => post.tags.includes(tag));
// }

/**
 * 
 * @returns blog project count
 */
export function getProjectCount() {
    return getProjectSlugs().length;
}

/**
 * Get all existing locales for a slug
 * @param slug 
 * @returns 
 */
function getSlugLocales(slug: string) {
    const files = fs.readdirSync(join(process.cwd(), "_data", directoryName, slug));
    return files.map(name => name.replace(/\.md$/, ''));
}

/**
 * Get a number of recommended posts based on tags
 * @param slug 
 * @param tags 
 * @returns 
 */
export function getRecommendedProjects(slug: string, tags: string[]) {

    const allPosts = getAllProjects(['slug', 'tags', 'title']);
    const matchingTags = allPosts.filter(p => p.tags.some(t => tags.includes(t)) && p.slug !== slug);
    const recommendedPosts = arrSampleSize(matchingTags, clamp(4, 0, matchingTags.length));

    // If there are not enough posts, fill the rest with random posts
    if (recommendedPosts.length < 4) {

        // Filter out posts that are already recommended
        const notSelected = allPosts.filter(p => !recommendedPosts.some(r => r.slug === p.slug));

        // Get random projects
        const randomPosts = arrSampleSize(notSelected, 4 - recommendedPosts.length);

        // Add random posts to recommended posts
        recommendedPosts.push(...randomPosts);
    }

    return recommendedPosts;
}

export const getFeaturedPortfolioData = async (locale: string) => {
    const portfolioData = getAllProjects(
        [
            'title',
            'date',
            'slug',
            'tags',
            'coverImage',
            'excerpt',
            'appUrl',
            'githubUrl',
            'featured',
        ],
        {locale: locale}
    );
    return portfolioData.filter(item => item.featured);
}