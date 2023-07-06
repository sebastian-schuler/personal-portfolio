---
type: 'article'
title: 'Building a JavaScript-Enabled Web Crawler with Playwright'
excerpt: "Web crawling has become more challenging with the rise of dynamic websites that rely heavily on JavaScript. To create a powerful web crawler that can handle JavaScript-rendered pages, we need a solution that can execute JavaScript code. In this tutorial, we'll explore how to build a JavaScript-enabled web crawler using Node.js, TypeScript, and the Playwright library. Playwright provides a high-level API for automating web browsers, making it an excellent choice for our project."
coverImage: '/assets/blog/preview/cover.jpg'
date: '2022-11-21T05:35:07.322Z'
ogImage:
  url: '/images/blog/opengraph/preview.png'
ogDesc: 'An easy guide on how and why to implement a pagination in Next.JS'
tags: 'node,playwright,crawler'
readTime: 10
---

## Prerequisites

Make sure you have your Node.js project set up and ready to go, preferably using TypeScript.

## Installing Playwright

To install Playwright, run the following command in your project directory:

```bash
npm init playwright@latest
```

You'll also need a browser to run your crawler. Playwright supports Chromium, Firefox, and WebKit. More information on how to install them can be found [here](https://playwright.dev/docs/intro#installing-playwright).

## Creating a Crawler

Create a file called ``crawler.ts``. This is where we'll write our web crawler code.

```ts
import { chromium, Browser, Page } from 'playwright';

const url = 'https://example.com'; // Specify the URL you want to crawl

export const crawl = () => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  
  await page.goto(url);
  
  // Wait for JavaScript to execute and content to load
  await page.waitForLoadState('networkidle');
  
  // Extract the data you need using Playwright's DOM manipulation methods
  // For example, let's scrape all the links on the page
  const links = await page.$$eval('a', (elements) =>
    elements.map((element) => element.getAttribute('href'))
  );
  
  console.log(links);
  
  await browser.close();
}

crawl();
```

In this code, we import the necessary Playwright modules and define the URL we want to crawl. We launch a new browser instance, create a new page, and navigate to the specified URL using the ``page.goto()`` method. We then wait for the JavaScript to execute and for the page to reach a network idle state using the ``page.waitForLoadState()`` method. We then use Playwright's DOM manipulation methods, such as ``page.$$eval()``, to extract the desired data from the page. In this example, we scrape all the links on the page and log them to the console. Finally, we close the browser.

## Optional: Additions to the Crawler

### Handling Navigation and Waiting for Elements

Playwright provides methods for navigating through pages, waiting for certain conditions, and interacting with elements. Let's look at an example that demonstrates these capabilities:

```ts
import { chromium, Browser, Page, waitForSelector } from 'playwright';

const url = 'https://example.com';

async function navigateAndInteract() {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  await page.goto(url);

  // Wait for a specific element to appear on the page
  await page.waitForSelector('h1');

  // Click on a button and wait for navigation
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[data-action="submit"]')
  ]);

  // Perform further scraping or interaction operations

  await browser.close();
}

navigateAndInteract();
```

In this snippet, we use ``waitForSelector()`` to wait for an h1 element to appear on the page. We then use ``waitForNavigation()`` in conjunction with ``page.click()`` to click a button and wait for the subsequent navigation to complete. These methods ensure that our crawler interacts effectively with the page.

### Intercepting Network Requests

Playwright allows us to intercept and modify network requests, which is valuable for capturing data, stubbing responses, or handling authentication. Consider the following example:

```ts
import { chromium, Browser, Page, Request } from 'playwright';

const url = 'https://example.com';

async function interceptNetworkRequests() {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();

  // Intercept all network requests for images
  await page.route('**/*.{png,jpg,jpeg}', (route: Request) => {
    console.log(`Intercepted request: ${route.url()}`);
    // Modify or capture data from the request
    route.continue();
  });

  await page.goto(url);

  // Perform further scraping or interaction operations

  await browser.close();
}

interceptNetworkRequests();
```

In this code, we use ``page.route()`` to intercept all network requests made by the page. Within the route handler, we can modify or capture data from the request as needed. We then call ``route.continue()`` to allow the request to continue as usual.
