# Base44 sandbox notes

## What this repo is
- A single Vite + React 19 SPA. The runnable project is **not** at the repo root: it lives in `my-project/play` (its own `package.json`, lockfile and `vite.config.js`).
- There is no backend, database, or environment variable requirement — the app keeps its state in `localStorage` and navigates with internal React state (`App.jsx` `currentPage`), not with routes. Every screen therefore lives at `/`; you reach the others by clicking through the flow.

## How to run it here
- `docker compose -f docker-compose.base44.yml up -d` — one `node:22` service (`web`) bind-mounts the repo, runs `npm ci` on start and then `vite --host 0.0.0.0 --port 3000`.
- Dependencies live in an anonymous volume at `/app/my-project/play/node_modules`, so a container restart re-syncs them from `package-lock.json` (no image rebuild needed after a dependency change).
- Host port 3000 is the app entry point. Vite's allowed hosts come from the platform-provided `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` variable, passed through unchanged.

## How to verify it works
- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` should answer `200`.
- `docker compose -f docker-compose.base44.yml exec -T web npx vite build` should finish with `✓ built in ...` — this is the real compile check and it currently passes.
- `npm run lint` (`npx eslint .`) is **not** clean on this branch (unused vars, `react-hooks/set-state-in-effect`). It is pre-existing and does not block `vite dev`/`vite build`.
- A quick smoke test inside `preview_execute_code`: wait for `.new-account-btn` (the landing screen auto-advances to page two after a ~4s progress bar), then `two → three → four → five (OTP 123456) → six → eight (16-question quiz)`. `six`'s home button opens the dashboard (`.seven-container`).
- The preview browser keeps its page state between checks; run any shell command first if you need a fresh load back at the landing screen.

## Quirks worth knowing
- `src/component/Home/Tasks.jsx` points at `../../image/task-illustration.png`, which does not exist in the repo; the `<img>` has an `onError` fallback so the lesson still renders (a 404 shows up in the network log).
- The signup form (`Four.jsx`) relies on the browser's native email validation; an invalid email blocks submit with a native tooltip, which looks like a dead "Continue" button.
