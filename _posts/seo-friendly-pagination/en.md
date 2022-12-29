---
title: 'SEO-Friendly Pagination Using Next.js'
excerpt: "At a certain point the amount of content on your website might be too much for one single page. Long loading times will negatively affect user experience. This article will show you how to implement pagination a possible solution to this using Next.js and Mantine. We'll also discuss alternatives and why they all perform worse than pagination."
coverImage: '/assets/blog/preview/cover.jpg'
date: '2022-11-21T05:35:07.322Z'
ogImage:
  url: '/images/blog/opengraph/preview.png'
ogDesc: 'An easy guide on how and why to implement a pagination in Next.JS'
tags: 'next,mantine,seo'
readTime: 10
---
***When to use pagination?***\
Websites that use dynamic content, such as blogs (just like this one) or ecommerce platforms will usually have too much content to list on a single page. Statically displaying every article or product on the same page is going to cause the file size to be way too large. Dynamically loading content ('endless scrolling') is terrible for SEO as search engine bots can't see the dynamic content. A properly implemented pagination will give you the best of both worlds, good SEO and small file sizes.

## Pagination in Next.js

Every page will have it's own URL that you can navigate to, even without using the actual page component. You have the choice between two ways of displaying this URL. The first one would be as part of the URL path, e.g. yourblog.com/page-1. The second option is a query parameter, the most common way of handling pagination and generally best practice. Due to requiring a query, static rendering is not supported in this case. Google and other search engine bots also can't work with queries at all. In this article we'll focus on the query parameter approach.

### Pagination with query parameters

The most common way of handling pagination is to use query parameters. This is the default behavior of Next.js and is the easiest way to implement pagination. The downside is that you can't use static rendering and search engine bots can't see the content by default. There are ways to fix this, but we'll get to that later.

```typescript
export const getServerSideProps: GetServerSideProps = async (context) => {

  const currentPage = context.query.page ? parseInt(context.query.page) : 1;
  
  const pageCount = getBlogPageCount(); // This function returns the total number of pages
  const posts = getPosts({page: currentPage}); // This function returns all posts on a given page

  return {
    props: {
      pageCount,
      posts,
    },
  }
}
```

Above code is a simple example of how to implement pagination using query parameters. The `getServerSideProps` function is used to fetch the data for the page. The `page` query parameter is used to determine which page to fetch. The `pageCount` variable is used to determine how many pages there are in total. This is used to generate the pagination component.

### How to solve the SEO problem

In it's developer blog, Google suggests using the `rel="canonical"` tag to solve the SEO problem ([Google Developers - Canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)). This tag is used to tell search engine bots which URL is the original one. This is useful if you have multiple URLs that point to the same content. In our case, we have multiple URLs that point to the same page. The canonical tag is used to tell Google which URL is the original one. This way, Google will only index the original URL and ignore the others.
Additionally, you can use the `rel="next"` and `rel="prev"` tags to tell search engines which page is the next or previous one ([Google Developers - Pagination with rel="next" and rel="prev"](https://developers.google.com/search/blog/2011/09/pagination-with-relnext-and-relprev)). This way, they will be able to index all pages and will be able to navigate between them.

```typescript
const getCanonicalLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = currentPage > 1 ? "/page=" + currentPage : "";
    return `${PAGE_URL}/${localePart}blog${pageNumber}`
}

const getPrevLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = "/page=" + (currentPage - 1);
    return `${PAGE_URL}/${localePart}blog${pageNumber}`
}

const getNextLink = () => {
    const localePart = router.locale === router.defaultLocale ? "" : router.locale + "/";
    const pageNumber = "/page=" + (currentPage + 1);
    return `${PAGE_URL}/${localePart}blog${pageNumber}`
}
```

These functions inside our blog component will generate canonical, next, and prev links. You can leave out `localePart` if your website doesn't support multiple languages. The constant `PAGE_URL` contains the base URL of your website. The final links should look something like this:

```typescript
<link rel="canonical" href="https://sebastian-schuler.de/blog?page=2">
```

Finally, you need to add the links to the head of your page. This can be done using the `Head` component from Next.js ([next/head](https://nextjs.org/docs/api-reference/next/head)).

```typescript
      <Head>
        <link rel="canonical" href={getCanonicalLink()} />
        {
          currentPage > 1 && (
            <link rel='prev' href={getPrevLink()} />
          )
        }
        {
          currentPage < pageCount && (
            <link rel='next' href={getNextLink()} />
          )
        }
      </Head>
```

Notice that we only add the `rel="prev"` and `rel="next"` tags if there is a previous or next page. This way, we don't add unnecessary links to the head of our page.

## Applying the Next.js pagination to Mantine

To use the Mantine pagination component with your newly created pagination, you need to make use of the `itemComponent` prop in Mantines pagination component. This prop allows you to pass a custom component that will be used to render each page. This custom component should be a Next.js Link to make use of Next.js' client-side navigation. I'll show you an example component below.

```tsx
interface Props {
    currentPage: number
    pageCount: number
    rootPath: string
}

const MyPagination = ({ currentPage, pageCount, rootPath }: Props) => {

    const getDefaultButton = (text: string, isDisabled?: boolean) => {
        return (
            <Button disabled={isDisabled}>
                {text}
            </Button>
        )
    }

    return (
        <Pagination
            page={currentPage}
            total={pageCount}
            position='center'
            mt={'lg'}
            itemComponent={(props, context) => {

                const page = props.page;

                // Check if page is a number or 'next' / 'previous' etc.
                if (isNaN(Number(page))) {

                    if (page === 'prev') {
                        // If page is previous

                        if (currentPage === 1) {
                            // First page has previus button disabled
                            return <>{getDefaultButton('<')}</>

                        } else {
                            // Other pages have previous button enabled
                            return (
                                <Link href={{ pathname: '/' + rootPath, query: { page: currentPage - 1 }, }} passHref>
                                    {getDefaultButton('<')}
                                </Link>
                            )
                        }

                    }

                    if (page === 'next') {
                        // If page is next

                        if (currentPage === pageCount) {
                            // Last page has the next button disabled
                            return <>{getDefaultButton('>')}</>

                        } else {
                            // Other pages have a next button
                            return (
                                <Link href={{ pathname: '/' + rootPath, query: { page: currentPage + 1 }, }} passHref >
                                    {getDefaultButton('>')}
                                </Link>
                            )
                        }
                    }

                    // Will only happen if we enable edges in pagination ('first','last')
                    return <Link href={toLink(rootPath)}>{page}</Link>

                } else {
                    // If page is a number

                    if (currentPage === page) {
                        // If page number equals the currently displayed page
                        return (
                            <Link href={{ pathname: '/' + rootPath, query: page === 1 ? undefined : { page: page }, }} passHref>
                                <Button variant='filled'>
                                    {page}
                                </Button>
                            </Link>
                        )
                    } else {
                        // If page is not the current page
                        return (
                            <Link href={{ pathname: '/' + rootPath, query: { page: page }, }} passHref>
                                {getDefaultButton(page.toString())}
                            </Link>
                        )
                    }
                }
            }}
        />
    )
}
```

That's it, you can now use the pagination component in your blog page. You can find the full documentation of the pagination component in the [Mantine documentation](https://mantine.dev/core/pagination/).
