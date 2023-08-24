---
title: 'Orbital Edge Imaging'
excerpt: "Proof-of-concept web application for a (fictional) startup that enables users to search the company's API using a specified Area of Interest."
coverImage: '/images/portfolio/orbital-edge-imaging-thumbnail.jpg'
date: '2023-08-24T05:35:07.322Z'
ogImage: 
  url: '/images/blog/opengraph/preview.png'
tags: 'TypeScript,React,Mantine,Next.js,Leaflet'
githubUrl: 'https://github.com/sebastian-schuler/orbital-edge-imaging'
appUrl: 'https://orbital-edge-imaging-five.vercel.app/'
featured: 'true'
---

## Abstract

This is a proof-of-concept web application for a (fictional) startup called "Orbital Edge Imaging" that enables users to search the company's API using a specified Area of Interest.

## Features

- Upload a GeoJSON file or draw an Area of Interest on the map
- Get a list of satellite flyovers by date, cloud cover, and image cover
- Get specific layers of the map (TRUE_COLOR, NDVI, VEGETATION, etc.)
- Download the image in different formats (jpg, png, tiff) and sizes

## Technologies

- React with TypeScript
- Mantine UI (component library)
- Valtio (state management)
- Next.js (server-side rendering)
- Leaflet (map library)
  - React-Leaflet (React wrapper)
  - React-Leaflet-Draw (drawing on the map)
- Turf.js (geospatial analysis)
- Cypress (end-to-end testing)

## GIFs

![Step by step display of the app](https://github.com/sebastian-schuler/orbital-edge-imaging/blob/main/ogc-service-optimized.gif?raw=true)

![Step by step display of the app](https://github.com/sebastian-schuler/orbital-edge-imaging/blob/main/ogc-service-draw-area.gif?raw=true)
