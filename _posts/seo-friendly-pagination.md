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
## When to use pagination?

Websites that use dynamic content, such as blogs (just like this one) or ecommerce platforms will usually have too much content to list on a single page. Statically displaying every article or product on the same page is going to cause the file size to be way too large. Dynamically loading content ('endless scrolling') is terrible for SEO as search engine bots can't see the dynamic content. A properly implemented pagination will give you the best of both worlds, good SEO and small file sizes.

## Pagination in Next.js

