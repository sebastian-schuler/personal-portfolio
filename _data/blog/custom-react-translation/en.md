---
type: 'article'
title: 'How to implement your own React internationalization with no dependencies'
excerpt: "In today's globalised world, it's essential to build applications that can serve users speaking different languages. That's why having a robust translation solution is crucial. While there are several libraries available to handle translation and internationalization, building your own i18n hook in React using TypeScript can give you greater control and understanding of how translation is handled in your application."
coverImage: '/assets/blog/preview/cover.jpg'
date: '2023-02-05T05:35:07.322Z'
ogImage:
  url: '/images/blog/opengraph/preview.png'
tags: 'react,next,l18n'
readTime: 15
---

## Should you build your own translation library?

When it comes to implementing translation in your application, one of the first decisions you'll have to make is whether to build your own translation library or use an existing one. Both options have their pros and cons, and the choice you make will depend on several factors, including the size of your project, your budget, and your goals. In this blog post, we'll compare the pros and cons of both options to help you make an informed decision.

### Existing translation library

| + Pros  | - Cons           |
| ------- | ---------------- |
| **Time-saving:** Using an existing library can save you a lot of time, as you don't have to build the library from scratch. You can simply install the library and start using it in your application. | **Limited customization:** With an existing library, you may be limited in terms of customization, as you have to work within the constraints of the library's existing functionality. |
| **Cost-effective:** Using an existing library is usually more cost-effective than building your own, as you don't have to spend time and resources on development and maintenance. | **Dependency:** When you use an existing library, you are dependent on it, and if the library becomes deprecated or its maintainers stop supporting it, you may have to switch to a different library or build your own. |
| **Wide support:** Existing libraries have been tested and used by many developers, which means they are reliable and well-supported. | |

### Custom translation library

| + Pros  | - Cons           |
| ------- | ---------------- |
| **Full control:** When you build your own translation library, you have full control over the implementation, and you can tailor it to your specific needs and requirements. | **Time-consuming:** Building your own translation library can be time-consuming, especially if you are new to the field. You'll need to research and understand the best practices for - translation, and you'll also need to test and debug the implementation. |
| **Customization:** You can customize the library to handle specific cases or languages that other libraries may not support. | **Maintenance:** Once you've built your own library, you'll need to maintain it, which includes fixing bugs, adding new features, and updating it to support new languages. |
| **Flexibility:** You can add, remove, or modify features as you see fit, without having to worry about compatibility issues. | |
| **Lightweight:** You can build a lightweight library that is tailored to your specific needs, which means it will be more efficient and less resource-intensive. | |

## How to Build Your Own Translation Library

Now that you know the pros and cons of using an existing translation library and building your own, let's take a look at how to build your own translation library in React using TypeScript. For this tutorial, we'll assume that you have a basic understanding of React and have an existing project ready.

### Step 1: Set up translation types

The first step is to set up the types and helper functions for the translation library. We'll start by creating a new file called `localeUtil.ts` in the `util` directory (or a directory / filename of your choosing).

```typescript
// LangType describes a locale object like so: {de:string, en:string}
type LangType<Lang extends string> = { [k in Lang]: string }

// LangTypeFn is a LangType or a function, which returns a LangType
type LangTypeFn<Lang extends string> = LangType<Lang> | ((...x: any) => LangType<Lang>)

// Convert a translation type to a specific language
type LocaleStringConversion<Lang extends string, S extends Record<any, LangTypeFn<Lang>>> = {
    [x in keyof S]: S[x] extends ((...x: infer ARGS) => { [k in Lang]: infer Res })
    ? (...x: ARGS) => Res : S[x] extends Record<Lang, any>
    ? S[x][Lang] : never
};

/**
 * Generates a translation object for a specific language
 * @param strings - translation object
 * @param lang - Language to convert to
 * @returns - translation object for the specific language
 */
export function convertLocaleStrings<Lang extends string, S extends Record<any, LangTypeFn<Lang>>> (strings: S, lang: Lang): LocaleStringConversion<Lang, S> {

    let res: any = {};

    for (let [key, value] of Object.entries(strings)) {
      if (typeof value === "object") {
          res[key] = value[lang];
      } else if (typeof value === "function") {
          res[key] = (...xs: any[]) => {
              // @ts-ignore
              return value(...xs)[lang]
          }
      } else {
          throw new Error("convertStrings: " + typeof value); // Add your own error handling
      }
    }
    return res;
}
```

### Step 2: Create translation file

In this step we'll create the translation file. We'll start by creating a new file called `locale-data.ts` in the `locale` directory (or a directory / filename of your choosing).

```typescript
export const LOCALE_DATA = {

    // ========== META ==========
    description: {
        en: `This is a website about trees and plants.`,
        de: `Dies ist eine Website über Bäume und Pflanzen.`,
    },

    // ========== UI ==========
    button: {
        en: "Toggle language",
        de: "Sprache wechseln",
    },

    // ========== CONTENT ==========
    content: {
        en: `This is the content.
        Multi-line content is possible.`,
        de: `Dies ist der Inhalt.
        Mehrzeiliger Inhalt ist möglich.`,
    },

    // Function with parameters
    x_min_rem: (min:number) => ({
        de: `Es sind noch ${min} Minuten verbleibend`,
        en: `There are ${min} minutes remaining`
    }) as const,

    from_x_to_y: (x:number, y:number) => ({
        de: `Von ${x} bis ${y}`,
        en: `From ${x} to ${y}`
    }) as const,

    // Function with parameters and plural
    customer: (count:number) => ({
        de: `Kunde ${count > 1 ? "n" : ""}`,
        en: `Customer${count > 1 ? "s" : ""}`
    }) as const,

} as const;
```

### Step 3: Create translation context

In this step you don't necessarily have to use React Context, any state management library will work. For the sake having zero dependencies, we'll use React Context. Expand your `App.tsx` file to include the following code:

```tsx
import React, { useState } from 'react';
import TestComponent from './components/TestComponent';
import { useTranslation } from './hooks/useTranslation';

export const UserContext = React.createContext("en");

const App = () => {

  const [language, setLanguage] = useState("en");
  const T = useTranslation(language); // Overwrite locale as the context does not work here

  // You can also make your own function, especially if you have more than two languages
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  }

  return (
    <UserContext.Provider value={language}>
      <div>
        <button onClick={toggleLanguage}>{T.button}</button>
        <TestComponent />
      </div>
    </UserContext.Provider>
  )
}

export default App
```

### Step 4: Create translation hook

Next, we'll create the translation hook and context. We'll start by creating a new file called `useTranslation.ts` in the `hooks` directory (or a directory / filename of your choosing).

```typescript
import React from "react";
import { UserContext } from "../App";
import { LOCALE_DATA } from "../locale/locale-data";
import { convertLocaleStrings } from "../util/localeUtil";

// Store into global variable so the translations are generated only once when app the app starts (you can change this if you want different behaviour)
const locales = {
    en: convertLocaleStrings(LOCALE_DATA, "en"),
    de: convertLocaleStrings(LOCALE_DATA, "de"),
};

// React hook which returns a translation object
// Usage: 
// 1. Declare translation object
// > const T = useTranslation()
// 2. Use in render function
// > return (<div>{T.title}</div>);
export function useTranslation(overwriteLocale?: string) {

    // If you're using Next.js you can get the locale from the router object
    // let { locale } = useRouter();

    const locale = overwriteLocale ?? React.useContext(UserContext);

    if (locale == "en") return locales.en;
    if (locale == "de") return locales.de;

    return locales.en;
}
```

### Step 5: Use translation hook

Finally, we can use the translation hook in our components.

```tsx
import { useTranslation } from '../hooks/useTranslation';

const TestComponent = () => {
    
    const T = useTranslation();

    return (
        <div>
            <p>{T.description}</p>
            <p>{T.from_x_to_y(1, 10)}</p>
        </div>
    )
}

export default TestComponent
```

Congratulations, you've just created your own translation system for your React app!

### Optional: Source code of the example app

You can find the source code of the example app [here](https://github.com/sebastian-schuler/custom-translation-example).

## Alternative: Existing i18n libraries for React and Next.js

If you don't want to create your own translation system, you can use existing libraries. Here are some popular examples:

### react-i18next (React / React Native)

[react-i18next](https://react.i18next.com) is a powerful internationalization framework for React / React Native which is based on [i18next](https://www.i18next.com/) (a popular library for JavaScript, not Next.js despite it's name). It has a lot of features and supports server-side rendering. Almost any i18n problem has a plugin to solve it: detection of the user's language, async loading of translation files, and more.

The price for all these features is a somewhat larger bundle size, with a total of 22.2 kB added to your bundle. However, given that i18next is feature-complete, you may be willing to take this tradeoff.

### next-i18next (Next.js)

Based on react-i18next, [next-i18next](https://github.com/i18next/next-i18next) is a library for Next.js which offers the same features, optimized for Next.js.

### Format.js / react-intl (React)

[Format.js](https://formatjs.io/) is a set of i18n libraries with a strong focus on standards, namely the ICU message syntax and Unicode CLDR (Common Locale Data Repository). For React applications, react-intl extends FormatJS to provide components, hooks, and more. However, unlike i18next, react-intl doesn't provide solutions for language detection or loading translation files.

react-intl's bundle size is slightly smaller than react-i18next's, with a total of 17.8 kB minified + gzipped.

### LinguiJS (React)

Being the lightweight solution, [LinguiJS](https://lingui.dev/) has a small bundle footprint compared to the previous two libraries. Totaling 10.4 kB, it's about half the size of react-i18next or react-intl.
