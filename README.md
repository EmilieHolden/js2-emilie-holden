# Strawberry

JavasScript 2 project at Noroff.
A social media application where users can register and log in to create onw posts and view other users posts.

Link to live demo: emilieholden.github.io/js2-emilie-holden/

<img width="1469" height="799" alt="Screenshot of deployed website" src="src/img/Skjermbilde 2026-02-22 kl. 22.23.53.png" />

## Features

- Log in/log out
- Create post
- Edit post
- Delete post
- Follow/unfollow user
- Pagination for posts in feed

## Prerequisites

- Node.js (v18 or later recommended)
- npm

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running the project

```bash
npm run dev
```

## API Configuration

This project uses the Noroff Social API.

The API base URL and required headers (including the API key and authorization token) are configured directly in the source code. Authentication is handled using a JWT token stored in `localStorage` after login.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## Technologies

- JavaScript
- HTML
- CSS
- ESLint
- Prettier

## Author

Emilie Holden - e.393@hotmail.com
Github - Emilieholden
