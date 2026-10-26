# Audit — booking-tattoos → CD Tattoos

## What this repo was

A Next.js 13 Pages Router app for a tattoo artist with two very different
halves:

1. **Public landing page** — hero + a multi-step "Request Tattoo" modal.
2. **Private admin app** — dashboard, submissions, users, tickets, messages,
   calendar, and billing pages.

## Backend / auth surface found

| Area         | What was there                                                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Auth         | NextAuth with a Google provider + Prisma adapter, role-gated nav (`user` / `admin` / `dev` / `super`), bcrypt                           |
| API          | tRPC routers for appointments, appointment notes, calendar events, sessions, tickets, and users; `[...nextauth]` and `[...trpc]` routes |
| Data         | Prisma schema on MongoDB (`DATABASE_URL`), generated client, test data                                                                  |
| Files        | Firebase Storage uploads for reference images                                                                                           |
| Email        | Nodemailer + HTML confirmation template                                                                                                 |
| Config       | `src/env.mjs` hard-failing the build unless DB/Auth/Google secrets were present; Prisma `postinstall`                                   |
| Client state | Zustand stores + React Query + react-hot-toast tied to the above                                                                        |

The public site could not build without a database and OAuth secrets, and
there was no portfolio at all.

## What changed

- **Removed** all auth, tRPC, Prisma/MongoDB, Firebase, Nodemailer, env
  validation, API routes, admin pages, admin components, hooks, and backend
  dependencies.
- **Rebuilt** the frontend as a static marketing site:
  - `/` landing page (hero, selected work, booking process)
  - `/portfolio` gallery driven by `src/data/portfolio.ts`
  - `/book` Google Calendar appointment-schedule iframe
  - custom 404
- **Rebranded** every user-visible reference to **CD Tattoos**, including
  metadata, nav, footer, README, and favicon.
- **Configured** `output: "export"` so the build emits plain static files in
  `out/` — no Node server needed.
- **Reduced dependencies** to Next, React, Tailwind, and tooling (`serve` for
  local preview).
- **Added** six original SVG placeholder pieces so the gallery is presentable
  before real photos are supplied.

## Current runtime model

```text
Browser ── static HTML/CSS/JS (out/)
   └───── iframe ──> Google Calendar appointment schedule
```

Booking availability, confirmation email, reminders, time-zone handling, and
rescheduling all live in Google Workspace/Calendar. The site only embeds the
schedule and links out to it.

## Remaining work (content, not code)

1. Create the Google Calendar appointment schedule and set
   `NEXT_PUBLIC_GOOGLE_BOOKING_EMBED_URL` / `NEXT_PUBLIC_GOOGLE_BOOKING_URL`.
2. Replace `public/portfolio/*.svg` with real tattoo photos and update
   `src/data/portfolio.ts`.
3. Set the real contact email and Instagram URL in `.env.local`.
4. Point a domain at the static build.

## Notes / caveats

- `public/images/shop.jpg` is the hero background.
- The old favicons were regenerated from `public/favicon.svg` using the new CD
  monogram.
- Because there is no backend, there is no server-side booking record. The
  Google Calendar appointment schedule is the single source of truth.
- Next.js was upgraded from 13.2.4 to the patched 15.5.28 line so native
  `output: "export"` works and the critical 2025–2026 advisories are avoided.
