import fs from 'fs/promises';
import { join } from 'path';
import { zodPortfolioFile } from '../../types/zod';

const directory = join(process.cwd(), '_data', 'portfolio');

export const getPortfolioData = async (locale: string) => {

    // Get possible locales
    const localeFiles = (await fs.readdir(directory)).map(name => name.replace(/\.json$/, ''));

    // Get the content
    const rawContent = await fs.readFile(join(directory, `${localeFiles.includes(locale) ? locale : "en"}.json`), 'utf8');

    // Parse the content
    const parsed = zodPortfolioFile.safeParse(JSON.parse(rawContent));

    if (parsed.success) {
        return parsed.data.items;
    } else {
        console.error(parsed.error)
        throw new Error("Failed to parse portfolio data");
    }

}

export const getFeaturedPortfolioData = async (locale: string) => {
    const portfolioData = await getPortfolioData(locale);
    return portfolioData.filter(item => item.featured);
}