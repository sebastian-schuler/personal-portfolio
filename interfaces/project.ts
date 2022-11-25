type Project = {
    slug: string
    title: string
    date: string
    coverImage: string
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
  
  export default Project