# Bilbili - Educational and Informative Blog Website

Bilbili is a high-performance, accessible, hierarchical educational blogging platform.

## Architecture & Data Flow

```mermaid
flowchart TD
  Client[Web Browser] -->|Reads| NextServer[Next.js App Router]
  NextServer -->|Server Component Fetch| AdminSDK[firebase-admin SDK]
  AdminSDK -->|Cached/Direct Query| Firestore[(Firestore DB)]
  AdminUI[Admin Dashboard] -->|Server Actions| AdminSDK
  AdminSDK -->|Revalidate Tags| NextCache[Next.js Data Cache]
```

## Setup & Environment
Configure `.env.local` based on `.env.example`.

## Scripts
- `npm run dev`: Start Next.js dev server.
- `npm run build`: Production build.
- `npm run verify`: Run lint, typecheck, line-length check, codemap generator, and test suite.
