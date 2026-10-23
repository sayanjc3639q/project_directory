/**
 * @file src/features/theme/index.ts
 * @purpose Public feature exports for the theme module.
 * @tags theme, barrel, exports
 */
export { ThemeToggle } from "./components/ThemeToggle";
export { themeInitScript } from "./lib/themeInitScript";
export { setTheme } from "./store/themeSlice";
export type { ThemeMode, ThemeState } from "./store/themeSlice";
