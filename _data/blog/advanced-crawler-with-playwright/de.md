---
type: 'article'
title: 'Erstellung eines JavaScript-fähigen Web-Crawlers mit Playwright'
excerpt: "Das Crawlen von Websites ist mit dem Aufkommen dynamischer Websites, die stark auf JavaScript basieren, zu einer größeren Herausforderung geworden. Um einen leistungsfähigen Web-Crawler zu erstellen, der mit JavaScript-gerenderten Seiten umgehen kann, benötigen wir eine Lösung, die JavaScript-Code ausführen kann. In diesem Tutorial wird gezeigt, wie man einen JavaScript-fähigen Web-Crawler mit Node.js, TypeScript und der Playwright-Bibliothek erstellt."
coverImage: '/assets/blog/preview/cover.jpg'
date: '2022-11-21T05:35:07.322Z'
ogImage:
  url: '/images/blog/opengraph/preview.png'
ogDesc: 'An easy guide on how and why to implement a pagination in Next.JS'
tags: 'node,playwright,crawler'
readTime: 10
---

## Voraussetzungen

Stelle sicher, dass dein Node.js-Projekt eingerichtet und einsatzbereit ist, vorzugsweise mit TypeScript.

## Installieren von Playwright

Um Playwright zu installieren, führe den folgenden Befehl in deinem Projektverzeichnis aus:

```bash
npm init playwright@latest
```

Du brauchst auch einen Browser, um deinen Crawler auszuführen. Playwright unterstützt Chromium, Firefox und WebKit. Weitere Informationen zur Installation dieser Browser findest du [hier](https://playwright.dev/docs/intro#installing-playwright).

## Erstellen eines Crawlers

Erstelle eine Datei namens ``crawler.ts``. Hier werden wir den Code für unseren Webcrawler schreiben.

```ts
import { chromium, Browser, Page } from 'playwright';

const url = 'https://example.com'; // Angabe der URL, die gecrawlt werden soll

export const crawl = () => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  
  await page.goto(url);
  
  // Warte auf die Ausführung von JavaScript und das Laden des Inhalts
  await page.waitForLoadState('networkidle');
  
  // Extrahiere die benötigten Daten mithilfe der DOM-Manipulationsmethoden von Playwright
  // Zum Beispiel können wir alle Links auf der Seite scrapen
  const links = await page.$$eval('a', (elements) =>
    elements.map((element) => element.getAttribute('href'))
  );
  
  console.log(links);
  
  await browser.close();
}

crawl();
```

In diesem Code importieren wir die erforderlichen Playwright-Module und definieren die URL, die wir crawlen möchten. Wir starten eine neue Instanz des Browsers, erstellen eine neue Seite und navigieren mit der Methode ``page.goto()`` zur angegebenen URL. Dann warten wir mit der Methode ``page.waitForLoadState()`` auf die Ausführung von JavaScript und darauf, dass die Seite einen Leerlaufzustand im Netzwerk erreicht. Anschließend verwenden wir die DOM-Manipulationsmethoden von Playwright, wie z.B. ``page.$$eval()``, um die gewünschten Daten aus der Seite zu extrahieren. In diesem Beispiel werden alle Links auf der Seite extrahiert und in der Konsole protokolliert. Abschließend wird der Browser geschlossen.

## Optional: Ergänzungen zum Crawler

### Umgang mit Navigation und Warten auf Elemente

Playwright bietet Methoden zum Navigieren durch Seiten, zum Warten auf bestimmte Bedingungen und zur Interaktion mit Elementen. Schauen wir uns ein Beispiel an, das diese Fähigkeiten demonstriert:

```ts
import { chromium, Browser, Page, waitForSelector } from 'playwright';

const url = 'https://example.com';

async function navigateAndInteract() {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  await page.goto(url);

  // Warten, bis ein bestimmtes Element auf der Seite erscheint
  await page.waitForSelector('h1');

  // Klicke auf eine Schaltfläche und warte auf die Navigation
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[data-action="submit"]')
  ]);

  // Weitere Scraping- oder Interaktionsoperationen durchführen

  await browser.close();
}

navigateAndInteract();
```

In diesem Ausschnitt verwenden wir ``waitForSelector()``, um zu warten, bis ein h1-Element auf der Seite erscheint. Dann benutzen wir ``waitForNavigation()`` in Verbindung mit ``page.click()``, um einen Button anzuklicken und auf die anschließende Navigation zu warten. Diese Methoden stellen sicher, dass unser Crawler effektiv mit der Seite interagiert.

### Abfangen von Netzwerkanfragen

Playwright ermöglicht es uns, Netzwerkanfragen abzufangen und zu modifizieren, was für die Erfassung von Daten, das Stubbing von Antworten oder die Handhabung der Authentifizierung nützlich ist.

Betrachte das folgende Beispiel:

```ts
import { chromium, Browser, Page, Request } from 'playwright';

const url = 'https://example.com';

async function interceptNetworkRequests() {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();

  // Abfangen aller Netzwerkanfragen für Bilder
  await page.route('**/*.{png,jpg,jpeg}', (route: Request) => {
    console.log(`Intercepted request: ${route.url()}`);
    // Ändern oder Erfassen von Daten aus der Anfrage
    route.continue();
  });

  await page.goto(url);

  // Weitere Scraping- oder Interaktionsoperationen durchführen

  await browser.close();
}

interceptNetworkRequests();
```

In diesem Code verwenden wir ``page.route()``, um alle von der Seite gestellten Netzwerkanfragen abzufangen. Innerhalb des Route-Handlers können wir die Daten der Anfrage nach Bedarf ändern oder erfassen. Anschließend rufen wir ``route.continue()`` auf, um die Anfrage wie gewohnt weiterlaufen zu lassen.
