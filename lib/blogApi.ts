import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import Post from '../interfaces/post';
import PostData from '../interfaces/post-data';
import Tag from '../interfaces/tag';

const POSTS_PER_PAGE = 10;

interface SlugData {
    value: string;
    locales: string[];
}

// posts folder path
const postsDirectory = join(process.cwd(), '_posts');

/**
 * Get all posts from the _posts folder
 * @returns - Array of post slugs
 */
export function getPostSlugs(): SlugData[] {
    const dirents = fs.readdirSync(postsDirectory, { withFileTypes: true });

    const articleDirectories = dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    let articles = articleDirectories.map((articleDirectory) => {
        return { value: articleDirectory, locales: getSlugLocales(articleDirectory) };
    });
    articles = articles.filter(article => article.locales.length > 0);

    return articles;
}

interface GetPostBySlugOptions {
    locale?: string;
}
/**
 * Get post data from markdown file
 * @param slug - post slug
 * @param fields - fields to return
 * @returns - typed post data
 */
export function getPostBySlug(slug: string, fields: (keyof Post)[], options?: GetPostBySlugOptions): Post {

    const availableLocales = getSlugLocales(slug);
    const prefLocale = options?.locale || 'en';

    const chosenLocale = availableLocales.includes(prefLocale) ? prefLocale : availableLocales[0];
    const fullPath = join(postsDirectory, slug, `${chosenLocale}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // const realSlug = slug.replace(/\.md$/, '');
    const realSlug = slug;
    const { data, content } = matter(fileContents);

    // Required fields
    const items: Post = {
        slug: realSlug,
        date: data.date || '',
        title: data.title || '',
        tags: data.tags?.split(',') || [],
        coverImage: data.coverImage || '',
        readTime: data.readTime || '',
        excerpt: data.excerpt || '',
        locales: availableLocales,
        locale: chosenLocale,
    };

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
function getPostDataBySlug(slug: SlugData, fields: string[] = []) {

    const chosenLocale = slug.locales.includes("en") ? "en" : slug.locales[0];

    const fullPath = join(postsDirectory, slug.value, `${chosenLocale}.md`);
    const realSlug = slug.value.replace(/\.md$/, '');

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items: PostData = {}

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

interface GetAllPostsOptions {
    page?: number
    locale?: string;
}
/**
 * Get all posts
 * @param fields - Fields to include in the response
 * @returns - Array of posts
 */
export function getAllPosts(fields: (keyof Post)[], options?: GetAllPostsOptions): Post[] {
    let slugs = getPostSlugs();

    // If page is set, only load that specific page
    if (options?.page) {
        const page = options.page;

        let fromIndex = page === 1 ? 0 : (page - 1) * POSTS_PER_PAGE;
        let toIndex = page === 1 ? POSTS_PER_PAGE : page * POSTS_PER_PAGE;
        slugs = slugs.slice(fromIndex, toIndex);
    }

    const posts = slugs
        .map((slug) => getPostBySlug(slug.value, fields, { locale: options?.locale }))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

/**
 * Get all tags
 * @returns - Array of tags
 */
export function getAllTags(): Tag[] {
    const slugs = getPostSlugs();
    const tags = new Map<string, number>();

    // Get unique tags and count
    slugs.forEach((slug) => {
        const post = getPostDataBySlug(slug, ['tags']);
        const postTags = post.tags.split(',');
        postTags.forEach((tag) => tags.set(tag, (tags.get(tag) || 0) + 1));
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
 * Get all posts for a tag
 * @param tag - Tag to filter by
 * @param fields - Fields to return
 * @returns - Array of posts
 */
export function getPostsByTag(tag: string, fields: (keyof Post)[], options?: GetPostsByTagOptions): Post[] {
    const allPosts = getAllPosts(fields, { locale: options?.locale });
    return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * 
 * @returns blog post count
 */
export function getPostCount() {
    return getPostSlugs().length;
}

/**
 * 
 * @returns blog page count, based on POSTS_PER_PAGE
 */
export function getPageCount() {
    return Math.ceil(getPostCount() / POSTS_PER_PAGE);
}

function getSlugLocales(slug: string) {
    const files = fs.readdirSync(join(process.cwd(), '_posts', slug));
    return files.map(name => name.replace(/\.md$/, ''));
}