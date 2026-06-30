# Photoworld — Agent Guide

## What this is

Next.js 16 photo portfolio with Ant Design 6 admin CMS, using App Router and TypeScript. External backend required at `NEXT_PUBLIC_API_URL` (see `.env.template`). No database or API layer lives in this repo.

## Commands

```bash
npm run dev          # Next.js dev server (port 3000, Turbopack)
npm run build        # Production build (Turbopack)
npm run lint         # ESLint (flat config, eslint src/)
npm run prettier     # Format all JS/JSX/TS/TSX
ANALYZE=true npm run build  # Bundle analyzer
```

No test suite exists. Typecheck runs during `npm run build`.

## Path aliases

All rooted at `src/` (configured in `tsconfig.json`):

```
components/*  →  src/components/*
services/*    →  src/services/*
utils/*       →  src/utils/*
modules/*     →  src/modules/*
styles/*      →  src/styles/*
```

Always use aliased imports, not relative `../../` paths.

## Code style

- Prettier: single quotes, 4-space tabs, 100 print width, trailing commas
- EditorConfig: tabs for `.js`, `.css`, `.md`; LF line endings
- ESLint: flat config (`eslint.config.mjs`), extends `eslint-config-next` + `eslint-config-prettier`
- `@next/next/no-img-element` is off — `<img>` usage is intentional
- `no-console` warns except `console.warn` and `console.error`

## Architecture

- **App Router**: All routes live under `src/app/`. Static pages (`/`, `/about`, `/admin`) are pre-rendered. Dynamic pages (`/category/[catId]`, `/pictures/[id]`, `/admin/[id]`) are server-rendered on demand.
- **Client components**: Components using `'use client'` are marked explicitly: `Navigation`, `Picture`, `ErrorPages`, `PageContainer`, all `modules/*`, and any page using hooks/cookies/Router.
- **Server components**: Layout, `Container`, `AdminContainer`, `Image`, `About` page.
- **Ant Design icons**: `src/components/icons.ts` re-exports only the icons used. If you add a new icon, add its export here.
- **Modal routing**: The app uses `useSearchParams` for Instagram-style modals (e.g., `/?id=X` shows a modal). `Link` uses standard href, not the old `as` prop pattern.
- **All functional components**: Class components have been converted to hooks. New code should follow this pattern.
- **antd v6**: Uses CSS-in-JS. Global styles in `src/styles/globals.css` target antd class names for theme overrides.

## Backend dependency

REST API endpoint groups (see `README.md` for full routes):

- `Auth/authenticate`, `Auth/validateToken`
- `Categories/list`, `Categories/save`, `Categories/remove`, `Categories/activeList`
- `Pictures/list`, `Pictures/save`, `Pictures/remove`, `Pictures/activeList`, `Pictures/loadByCategory`, `Pictures/detail`

All requests go through `src/services/BaseAPI.ts` which sends `x-token` and `x-language` headers. Errors shown via Ant Design `notification`.

## Admin section

`/admin` is a password-protected CMS. Auth token stored in cookies via `react-cookies`. Follow `src/services/AuthAPI.ts` for authenticated requests.
