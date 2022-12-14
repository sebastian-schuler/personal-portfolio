type Project = {
  slug: string
  title: string
  date: string
  coverImage: string
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

export default Project