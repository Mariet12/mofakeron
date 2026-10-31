# Base44 sandbox notes

## What this repo is
`my-project/play` is a **client-only** Vite + React 19 SPA (Arabic RTL kids' education UI).
There is **no backend, no database and no external service** — no credentials or env vars are required.

## Running it
```bash
docker compose -f docker-compose.base44.yml up -d      # dev server on host port 3000 (Vite inside on 5173)
docker compose -f docker-compose.base44.yml logs -f web
```
Dependencies are installed by `npm ci` from the committed `package-lock.json` into the
`node_modules` named volume on every container start, so a lockfile/`package.json` change only
needs a restart, not an image rebuild. The source is bind-mounted, so edits hot-reload.

## How to verify
`curl -s http://localhost:3000/` must return the dev `index.html` (it contains `/@vite/client`
and `/src/main.jsx`, unhashed). If it returns a bundled/hashed HTML, the app is being served from
a build instead of Vite and edits will not show.

## Quirks worth knowing
- **No router.** "Pages" are local state in `src/App.jsx` (`currentPage`), switched through an
  `onNavigate(name)` prop. There are no URLs, so deep links and a back button do not exist —
  always start at `/` and click through.
- The first screen (`First.jsx`) is a fake loading bar that auto-advances to `two` after ~4s.
- The "explore as guest" link on the welcome screen is an intentional no-op placeholder
  (`handleAction` only logs). Navigation into the app happens via "create account" (→ `three`).
- Language (`ar`/`en`) lives in `localStorage.app_lang`; `<html dir>` follows it.
- Images are imported from `src/image/*` (Vite asset pipeline), not `public/`.
- Known pre-existing console warning: `First.jsx` calls `onNavigate` inside a `setState` updater,
  producing React's "Cannot update a component while rendering a different component" error.
  It is harmless for rendering but should be moved into an effect if that screen is touched.
