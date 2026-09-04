# bundit-tracker

Cloudflare Worker backing `/track` and `/track/admin`.

A single `Tracker` Durable Object per tracked subject holds the last position
fix and the status-update timeline, and allows **at most one admin socket** —
connecting as admin is what claims the lock. A second admin is refused with
`locked`; connecting with `takeover=1` displaces the incumbent, which is told
`superseded`. Everyone else connects as a read-only viewer.

## Routes

| Route | Purpose |
| --- | --- |
| `GET /ws?role=viewer` | Viewer socket. Receives `state`, `updates`, `update`. |
| `GET /ws?role=admin&key=…[&takeover=1]` | Admin socket. Sends `fix` and `post`. |
| `GET /state` | JSON snapshot, for polling instead of a socket. |
| `GET /photo?id=…` | An update's photo. Immutable id, cached forever. |

All routes take an optional `?tracker=<id>` to address a different subject;
it defaults to `DEFAULT_TRACKER_ID`. Use a throwaway id for smoke tests so they
stay out of the live timeline.

Photos are stored as data URLs in the DO's SQLite and served over HTTP rather
than pushed down the socket, so rejoining mid-journey doesn't replay megabytes
of history. The admin downscales each photo below `MAX_PHOTO_CHARS` first,
because a Workers WebSocket frame caps at 1 MiB.

## Deploying

```sh
pnpm install
npx wrangler secret put ADMIN_KEY   # the key /track/admin expects in ?key=
npx wrangler deploy
```

`ALLOWED_ORIGINS` in `wrangler.jsonc` pins which sites may open sockets. For
local work, put `ADMIN_KEY=…` in `worker/.dev.vars` (gitignored) and run
`npx wrangler dev`; the frontend points at `http://localhost:8787` in dev.

The client's endpoint is baked into `src/components/track/config.ts` and can be
overridden with a `PUBLIC_TRACKER_URL` env var at build time.
