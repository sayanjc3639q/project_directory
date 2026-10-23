/**
 * @file src/features/theme/lib/themeInitScript.ts
 * @purpose Inline initialization script to prevent theme flashing before hydration.
 * @tags theme, script, no-flash, ssr
 */

export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('bilbili_theme');
    var mode = stored ? JSON.parse(stored) : 'system';
    var isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  } catch (e) {}
})();
`;
