# Bilbili Conventions

- **File Length**: Maximum 150 lines per file (including comments & blanks). Refactor/split when reaching 120 lines.
- **One Responsibility**: One component per file. Thin page and layout files (< 40 lines).
- **File Headers**:
```typescript
/**
 * @file relative/path.ts
 * @purpose One sentence on what this file does.
 * @tags comma, separated, keywords
 */
```
- **Naming**:
  - Components: `PascalCase.tsx`
  - Functions / Utilities: `camelCase.ts`
  - Server actions: `*.action.ts`
  - Redux slices: `*Slice.ts`, `*Selectors.ts`, `*Thunks.ts`
- **Zero Emojis & Zero Gradients**.
