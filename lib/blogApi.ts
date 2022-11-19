import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import Post from '../interfaces/post';
import PostData from '../interfaces/post-data';
import Tag from '../interfaces/tag';

const POSTS_PER_PAGE = 10;

// posts folder path
const postsDirectory = join(process.cwd(), '_posts');

/**
 * Get all posts from the _posts folder
 * @returns - Array of post slugs
 */
export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

/**
 * Get post data from markdown file
 * @param slug - post slug
 * @param fields - fields to return
 * @returns - typed post data
 */
export function getPostBySlug(slug: string, fields: (keyof Post)[]): Post {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Required fields
    const items: Post = {
        slug: realSlug,
        date: data.date || '',
        title: data.title || '',
        tags: data.tags?.split(','),
        coverImage: data.coverImage,
        readTime: data.readTime || '',
        excerpt: data.excerpt || ''
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
export function getPostDataBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
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

/**
 * Get all posts
 * @param fields - Fields to include in the response
 * @returns - Array of posts
 */
export function getAllPosts(fields: (keyof Post)[], page?: number): Post[] {
    let slugs = getPostSlugs();

    // If page is set, only load that specific page
    if (page) {
        let fromIndex = page === 1 ? 0 : (page - 1) * POSTS_PER_PAGE;
        let toIndex = page === 1 ? POSTS_PER_PAGE : page * POSTS_PER_PAGE;
        slugs = slugs.slice(fromIndex, toIndex);
    }

    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
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
        const post = getPostDataBySlug(slug,['tags']);
        const postTags = post.tags.split(',');
        postTags.forEach((tag) => tags.set(tag, (tags.get(tag) || 0) + 1));
    });

    // Sort tags by count
    const arr = Array.from(tags, ([tag, count]) => ({ name: tag, count: count }));
    arr.sort((a, b) => (a.count > b.count ? -1 : 1));

    return arr;
}

/**
 * Get all posts for a tag
 * @param tag - Tag to filter by
 * @param fields - Fields to return
 * @returns - Array of posts
 */
export function getPostsByTag(tag: string, fields: (keyof Post)[]): Post[] {
    const allPosts = getAllPosts(fields);
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