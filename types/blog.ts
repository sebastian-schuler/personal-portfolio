export interface Tag {
    name: string
    count: number
}

export type Post = {
    slug: string
    title: string
    date: string
    coverImage: string
    readTime: number
    excerpt: string
    ogImage?: {
        url: string
    }
    ogDesc?: string
    content?: string
    tags: string[]
    locales: string[]
    locale: string
}

export type ItemData = {
    [key: string]: string
}
