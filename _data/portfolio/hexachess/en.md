---
title: 'HexaChess - Multiplayer Online Game'
excerpt: "HexaChess is a chess variant played on a hexagonal board. The game was developed with React and Node.js and was a personal project to learn more about WebSockets."
coverImage: '/images/portfolio/hexachess-thumbnail.jpg'
date: '2023-08-01T05:35:07.322Z'
ogImage: 
  url: '/images/blog/opengraph/preview.png'
tags: 'TypeScript,React,Tailwind,Node.js,WebSockets'
githubUrl: 'https://github.com/sebastian-schuler/hexachess-client'
appUrl: 'https://dancing-twilight-3e29ca.netlify.app/'
featured: 'true'
---

## Abstract

HexaChess is an interesting new chess variant that takes the traditional game of chess and adds a unique twist by using a hexagonal board layout. This article presents an in-depth exploration of HexaChess, a chess variant that goes beyond a simple adaptation of the classic game. Built using React and Node technologies, HexaChess showcases a comprehensive implementation of standard chess rules within its hexagonal framework, offering players a refreshing and challenging experience.

## Features

- Fully implemented hexagonal chess rules
- Multiplayer online game with a lobby system
- Shows possible moves for each piece
- Tracks move history
- Score and captured pieces tracking
- Server-side validation of moves and game state

## Inspiration

This project was inspired by CGP Grey's video [Can Chess, with Hexagons?](https://www.youtube.com/watch?v=bgR3yESAEVE) and a general fascination with hexagonal grids. I also wanted to learn more about WebSockets and how you can use them to implement a multiplayer game.

## Technologies

### Client

- React with TypeScript
- Tailwind CSS
- Valtio (state management)
- Vite (bundler)
- immer (immutable states)

### Server

- Node.js with TypeScript
- WebSockets

### Limitations

Due to the nature of the hexagonal grid, the game is not fully responsive. It is playable on mobile devices, but the UI is not optimized for smaller screens. The server is hosted on the free tier of Render.com and may take a few seconds to wake up, as well as being limited to 15 minutes of activity until it goes to sleep again.

## Screenshots

Pre-game lobby:

![HexaChess Screenshot](/images/portfolio/hexachess/lobby.jpg)

Initial board:

![HexaChess Screenshot](/images/portfolio/hexachess/initial-board.jpg)

Mid-game board with side panel open:

![HexaChess Screenshot](/images/portfolio/hexachess/game.jpg)
