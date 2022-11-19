import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import PostType from '../interfaces/post';

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
 * @returns - post data
 */
export function getPostBySlug(slug: string, fields: (keyof PostType)[]): PostType {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Required fields
    const items: PostType = {
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

    return items;
}

/**
 * Get all posts
 * @param fields - Fields to include in the response
 * @returns - Array of posts
 */
export function getAllPosts(fields: (keyof PostType)[]) {
    const slugs = getPostSlugs();
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
export function getAllTags() {
    const slugs = getPostSlugs();
    const tags = new Map<string, number>();

    // Get unique tags and count
    slugs.forEach((slug) => {
        const post = getPostBySlug(slug, ['tags']);
        post.tags.forEach((tag) => tags.set(tag, (tags.get(tag) || 0) + 1));
    });

    // Sort tags by count
    const arr = Array.from(tags, ([tag, count]) => ({ tag, count }));
    arr.sort((a, b) => (a.count > b.count ? -1 : 1));

    return arr.map((item) => item.tag);
}

/**
 * Get all posts for a tag
 * @param tag - Tag to filter by
 * @param fields - Fields to return
 * @returns - Array of posts
 */
export function getPostsByTag(tag: string, fields: (keyof PostType)[]) {
    const allPosts = getAllPosts(fields);
    return allPosts.filter((post) => post.tags.includes(tag));
}

export function getPostCount() {
    return getPostSlugs().length;
}

export function getPageCount() {
    return Math.ceil(getPostCount() / 10);
}