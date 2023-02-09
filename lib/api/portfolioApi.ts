import fs from 'fs/promises';
import { join } from 'path';
import { PortfolioItem } from '../../types/portfolio';
import { zodPortfolioFile } from '../../types/zod';

const directory = join(process.cwd(), '_data', 'portfolio');

export const getPortfolioData = async (locale: string): Promise<PortfolioItem[]> => {

    // Get possible locales
    const localeFiles = (await fs.readdir(directory)).map(name => name.replace(/\.json$/, ''));

    let rawContent: string;
    if (locale === "en") {
        // Locale is english
        rawContent = await readFileContent(locale);
        return parseContent(rawContent);

    } else if (localeFiles.includes(locale)) {
        // Locale is not english and is supported
        rawContent = await readFileContent(locale);
        const rawContentEn = await readFileContent("en");

        // Merge the two files, prioritizing the non-english file
        const parsedContent: PortfolioItem[] = parseContent(rawContent);
        const parsedContentEn: PortfolioItem[] = parseContent(rawContentEn);
        const filteredEn: PortfolioItem[] = parsedContentEn.filter(filterItem => !parsedContent.find(findItem => findItem.slug === filterItem.slug));

        return [...parsedContent, ...filteredEn];

    } else {
        // Locale is not english and is not supported
        rawContent = await readFileContent("en");
        return parseContent(rawContent);

    }
}

export const getFeaturedPortfolioData = async (locale: string) => {
    const portfolioData = await getPortfolioData(locale);
    return portfolioData.filter(item => item.featured);
}

const readFileContent = (locale: string) => {
    return fs.readFile(join(directory, `${locale}.json`), 'utf8');
}

const parseContent = (rawContent: string) => {
    const parsed = zodPortfolioFile.safeParse(JSON.parse(rawContent));

    if (parsed.success) {
        return parsed.data.items;
    } else {
        console.error(parsed.error)
        throw new Error("Failed to parse portfolio data");
    }
}