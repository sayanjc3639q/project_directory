# Bilbili Architecture

## Core Principles
1. **Server First**: Public pages are Server Components using `firebase-admin`. No client-side Firebase SDK on public pages.
2. **Client Redux**: Client state only (theme, local bookmarks, search modal state, admin editor draft). Never cache server data in public Redux.
3. **Flat Color System**: Solid flat colors. No emojis, no gradients.
4. **Strict Modular Boundaries**: Every feature folder exports its public API via its `index.ts`. No deep imports across features.
