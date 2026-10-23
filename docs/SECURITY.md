# Security Model

1. **Client Firestore Access**: Blocked. Rules deny all client reads and writes unless authenticated with `{ admin: true }`.
2. **Public Data Reads**: Performed exclusively via `firebase-admin` on the server.
3. **Session Cookies**: Created at `/api/session` with `httpOnly`, `secure`, and `sameSite=strict`.
4. **Server Actions Protection**: All admin mutation actions explicitly invoke `requireAdmin()`.
5. **No Dangerous HTML**: Markdown and formatting parsed safely into React elements (`parseInline.tsx`). `dangerouslySetInnerHTML` is prohibited for user content.
