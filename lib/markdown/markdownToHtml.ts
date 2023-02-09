import { remark } from 'remark'
import remarkGfm from 'remark-gfm';
import html, { Root } from 'remark-html'

export default async function markdownToHtml(markdown: string) {
  // const result = await remark().use(html).process(markdown);

  const resultTree: Root = remark().use(remarkGfm).parse(markdown);

  return resultTree;
}