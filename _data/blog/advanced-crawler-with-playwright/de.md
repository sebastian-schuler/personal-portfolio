---
type: 'article'
title: 'Einen erweiterten Crawler mit Playwright schreiben'
excerpt: "Die Menge an Inhalten auf deiner Website kann irgendwann zu viel für eine einzelne Seite werden. Lange Ladezeiten wirken sich negativ auf die User Experience aus. Dieser Artikel zeigt dir, wie du die 'Paginierung', eine mögliche Lösung für dieses Problem, mit Next.js und Mantine implementieren kannst. Außerdem besprechen wir Alternativen und warum sie schlechter abschneiden als die Seitennummerierung."
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