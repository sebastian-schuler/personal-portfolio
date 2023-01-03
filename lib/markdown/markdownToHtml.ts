import { remark } from 'remark'
import html, { Root } from 'remark-html'

export default async function markdownToHtml(markdown: string) {
  // const result = await remark().use(html).process(markdown);

  const resultTree:Root = remark().parse(markdown);

  return resultTree;
}