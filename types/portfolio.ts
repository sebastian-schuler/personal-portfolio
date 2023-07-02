import { z } from "zod";
import { zodPortfolioItem } from "./zod";

export type Project = {
    slug: string
    title: string
    date: string
    coverImage: string
    excerpt: string
    tags: string[]
    ogImage?: {
        url: string
    }
    ogDesc?: string
    content?: string
    githubUrl?: string
    appUrl?: string
    featured?: boolean
}

export type PortfolioItem = z.infer<typeof zodPortfolioItem>;
