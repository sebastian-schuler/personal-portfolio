export type PostType = "article" | "project"

export type Post = Article | Project

export type Article = {
  type: "article"
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

export type Project = {
  type : "project"
  slug: string
  title: string
  date: string
  coverImage: string
  readTime: number
  excerpt: string
  ogImage?: {
    url: string
  }
  featured: boolean
  ogDesc?: string
  content?: string
  tags: string[]
  locales: string[]
  locale: string
  githubUrl?: string
  externalUrl?: string
}