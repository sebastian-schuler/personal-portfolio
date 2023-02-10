---
type: 'article'
title: 'Making An Advanced Web-Crawler Using Playwright'
excerpt: "At some point, the amount of content on your website may be too much for a single page. Long loading times will negatively affect the user experience. This article will show you how to implement pagination, one possible solution to this problem, using Next.js and Mantine. We'll also discuss alternatives and why they all perform worse than pagination."
coverImage: '/assets/blog/preview/cover.jpg'
date: '2022-11-21T05:35:07.322Z'
ogImage:
  url: '/images/blog/opengraph/preview.png'
ogDesc: 'An easy guide on how and why to implement a pagination in Next.JS'
tags: 'node,playwright,crawler'
readTime: 10
---
## When to use pagination?

Websites that use dynamic content, such as blogs (just like this one) or ecommerce platforms will usually have too much content to list on a single page. Statically displaying every article or product on the same page is going to cause the file size to be way too large. Dynamically loading content ('endless scrolling') is terrible for SEO as search engine bots can't see the dynamic content. A properly implemented pagination will give you the best of both worlds, good SEO and small file sizes.

## Pagination in Next.js

Every page will have it's own URL that you can navigate to, even without using the actual page component. You have the choice between two ways of displaying this URL. The first one would be as part of the URL path, e.g. yourblog.com/page-1. Without doing anything else, this would be the preferable option, as it supports static rendering. The second option is a query parameter, the most common way of handling pagination. Due to requiring a query, static rendering is not supported. Google and other search engine bots also can't work with queries at all. 