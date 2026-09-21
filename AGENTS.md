# Portfolio — working context

Personal site at [shravyamunugala.com](https://shravyamunugala.com). React 19 + Vite + Tailwind v4
+ React Router, deployed on Vercel.

The whole site is a thin React layer over one static data file. **Content changes are edits to
`src/data/site.js`** — nothing is hardcoded in the JSX. That also means most user-visible bugs are
data bugs (a dead link, a duplicate slug, a missing alt text), which is what the test suite guards.

## Layout

```
src/
  App.jsx           all components and routes; exports AppShell + default App
  data/site.js      every piece of content on the site
  assets/           hero image, world map path data
  test/setup.js     jsdom shims for scrollTo / scrollIntoView
```

Routes: `/` about, `/work`, `/research`, `/projects`, `/projects/:slug`, `/skills`,
`/places` (scrapbook), `*` 404.

## Commands

```bash
npm install
npm run dev
npm run build
npm test              # run once
npm run test:watch
npm run test:coverage # with thresholds
npm run lint
```

## Verified metrics

Measured 2026-09-21. Re-derive with `npm run test:coverage`; do not estimate.

| Metric | Value |
|---|---|
| Test count | 86 (46 data + 40 render/routing) |
| Line coverage | 100% |
| Statement coverage | 100% |
| Function coverage | 100% |
| Branch coverage | 97.75% |
| Thresholds enforced | lines/statements/functions 100, branches 95 |

Thresholds live in `vite.config.js` under `test.coverage.thresholds`. CI fails if coverage drops.
`src/App.jsx` and `src/data/site.js` are both at 100% statements; `main.jsx` and `src/assets/`
are excluded (mount-only and static blobs).

## Page titles are prose, not labels

A recurring trap when writing tests: the `<h1>` on each page is not the nav label.

| Route | Nav label | Actual `<h1>` |
|---|---|---|
| `/work` | Work | Where I've worked |
| `/research` | Research | Papers & a patent |
| `/projects` | Projects | Things I've built |
| `/skills` | Skills | Tools I reach for |
| `/places` | Scrapbook | The scrapbook |

## Gotchas

- **`AppShell` exists for testability.** It is the routed tree *without* `BrowserRouter`, so tests
  mount it inside a `MemoryRouter` at an arbitrary URL. The default export wraps it in a real
  router. Keep that split.
- Project index entries are **links, not headings** — query them with `getAllByRole('link')`.
- Section headings within a project post are used as React keys, so they must be unique per post.
  The data test enforces this.
- Places use `lng`, **not** `lon`. `profile.currently` is an array of `[label, text]` pairs, not
  strings.
- The scrapbook map pin has both hover and click handlers. `userEvent.click` fires `mouseEnter`
  first, which sets the tooltip, so the click then toggles it *off*. To test the touch path (tap
  with no hover) use `fireEvent.click` instead.
- `vite.config.js` sets `esbuild: { jsx: 'automatic' }`. Without it Vitest transforms JSX with the
  classic runtime and every test fails with `React is not defined`.
- The site deliberately contains **no em dashes**. A test enforces this across project prose.
- `coverage/` is gitignored and excluded from ESLint.
- The git remote must be **SSH**. Over HTTPS, pushes that touch `.github/workflows/` are rejected
  because the OAuth token lacks the `workflow` scope.

## CI

`.github/workflows/ci.yml` on push to main and every PR: ESLint, tests with coverage thresholds,
production build. Coverage uploaded as an artifact.

## Dependencies

Renovate (`renovate.json`): weekly Monday, with React (react + react-dom + their types), Tailwind
(tailwindcss + @tailwindcss/postcss + postcss + autoprefixer) and the build toolchain (vite,
vitest, eslint and plugins) each grouped so related packages move together. Requires the Renovate
GitHub App on the repo.
