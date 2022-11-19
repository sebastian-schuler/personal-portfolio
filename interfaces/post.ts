type Post = {
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
}

export default Post