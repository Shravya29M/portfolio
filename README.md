# Portfolio

[![CI](https://github.com/Shravya29M/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Shravya29M/portfolio/actions/workflows/ci.yml)
![coverage](https://img.shields.io/badge/coverage-100%25%20lines-brightgreen)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

My personal site: [shravyamunugala.com](https://shravyamunugala.com) — writing about what
I've built, where I've worked, and the papers I've published, plus a scrapbook page with an
interactive map of everywhere I've been.

Built with React 19, Vite, Tailwind v4 and React Router, deployed on Vercel.

## Running it

```bash
npm install
npm run dev          # dev server with HMR
npm run build        # production build to dist/
npm run preview      # serve the production build locally
```

## Tests

The site is a thin React layer over a single static data file, so most user-visible bugs are
data bugs: a dead link, a duplicate project slug, an image with no alt text. The suite guards
both halves.

```bash
npm test             # run once
npm run test:watch   # watch mode
npm run test:coverage # with coverage + thresholds
```

**86 tests, 100% line / statement / function coverage** (97.75% branch), enforced by Vitest
coverage thresholds in [`vite.config.js`](vite.config.js) — CI fails if coverage drops.

- [`src/data/site.test.js`](src/data/site.test.js) checks the data contract: unique URL-safe
  slugs, absolute outbound links, alt text on every image, section headings unique per post
  (they're used as React keys), and no em dashes in prose.
- [`src/App.test.jsx`](src/App.test.jsx) covers routing and rendering: every route, the 404
  fallthrough for both unknown paths and unknown project slugs, navigation between pages, the
  scrapbook map tooltip on hover *and* on tap, and `rel="noopener"` on every external link.

`App.jsx` exports `AppShell` — the routed tree without the router — so tests mount it inside a
`MemoryRouter` at an arbitrary URL.

## Structure

```
src/
  App.jsx           all components + routes
  data/site.js      every piece of content on the site
  assets/           hero image, world map path data
  test/setup.js     jsdom shims for scrollTo / scrollIntoView
```

Content changes are edits to `src/data/site.js`. The components read from it; nothing is
hardcoded in the JSX.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs ESLint, the test suite with
coverage thresholds, and a production build on every push and pull request. Dependency updates
come through Renovate ([`renovate.json`](renovate.json)), which groups React, Tailwind and the
build toolchain so related packages move together.
