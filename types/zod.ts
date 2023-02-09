import { z } from "zod";

export const zodPortfolioItem = z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    appUrl: z.string().or(z.null()),
    githubUrl: z.string().or(z.null()),
    featured: z.optional(z.boolean()),
});

export const zodPortfolioFile = z.object({
    items: z.array(zodPortfolioItem),
});