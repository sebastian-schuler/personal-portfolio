import { remark } from 'remark'
import html, { Root } from 'remark-html'
import { parseMarkdown } from './customMarkdownParser';

export default async function markdownToHtml(markdown: string) {
  // const result = await remark().use(html).process(markdown);

  const test:Root = remark().parse(markdown);

  return test;
  // return result.toString()
}