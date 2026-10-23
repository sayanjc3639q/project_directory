# Task Recipes

Step-by-step ordered recipes for common changes in Bilbili.

## 1. Add a New Block Type
1. `src/types/block.ts`: Add block interface to the discriminated union.
2. `src/lib/validation/block.schema.ts`: Add Zod schema to `blockSchema`.
3. `src/features/blogs/components/blocks/<Name>Block.tsx`: Implement read-only renderer.
4. `src/features/blogs/components/blocks/BlockRenderer.tsx`: Add block switch case.
5. `src/features/admin-blogs/components/block-editors/<Name>Editor.tsx`: Implement block editor.
6. `src/features/admin-blogs/lib/newBlock.ts`: Add factory method.
7. Colocated tests `<Name>Block.test.ts`.
8. Update `docs/DATA_MODEL.md` and `docs/FEATURE_MAP.md`.
9. Run `npm run verify`.

## 2. Add a Field to Topics or Blogs
1. `src/types/topic.ts` or `src/types/blog.ts`: Add TypeScript field.
2. `src/lib/validation/topic.schema.ts` or `blog.schema.ts`: Add validation.
3. `src/lib/firestore/mappers.ts`: Update Firestore data mappers.
4. Update UI forms and components.
5. Update `firestore.rules`.
6. Run `npm run verify`.

## 3. Change Theme Colors
1. `src/styles/tokens.css`: Update hex color variables.
2. `tailwind.config.ts`: Match Tailwind token extensions if needed.
3. Run `npm run verify`.

## 4. Fix a Bug
1. Check `docs/FEATURE_MAP.md` row for the feature.
2. Open ONLY listed files.
3. Write a regression test next to the file.
4. Implement fix keeping files under 150 lines.
5. Run `npm run verify`.
