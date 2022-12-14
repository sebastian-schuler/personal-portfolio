import { remark } from 'remark'
import html, { Root } from 'remark-html'

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);

  // const test:Root = remark().parse(markdown);
  // console.log(test);

  return result.toString()
}