---
type: 'project'
title: 'Convertee - Convert Anything'
excerpt: 'A compact and user-friendly conversion app for Android systems. Easily convert a large number of units, including currencies.'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2021-03-13T05:35:07.322Z'
ogImage:
  url: '/images/blog/opengraph/preview.png'
tags: 'Android,Java'
featured: false
githubUrl: ''
externalUrl: ''
---

Smart and lightweight conversion app for Android systems. Easily convert a large number of units, including currencies. The app is completely free and ad-free.

## Introduction

Convertee was a spur-of-the-moment idea, as I couldn't find a good and at the same time free conversion app. The biggest problems were either a very poor user experience, too much monetisation, or inaccurate conversion.

## Technology

The whole thing is programmed in native Android / Java and thus has the best possible performance. Particularly noteworthy is the choice of BigInteger and BigDecimal as data types to get the most accurate results possible. By using generic classes for conversion, the app is very easy to extend. Simply explained, I use three different types of classes as converters: the simplest is multiplication with the appropriate growth values (e.g. 1000 for metres to kilometres ), then the conversion using a mathematical formula (e.g. Celsius to Kelvin), and lastly the special ones like shoe sizes which have their own internal implementation.
