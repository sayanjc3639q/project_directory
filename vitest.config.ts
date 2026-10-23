/**
 * @file vitest.config.ts
 * @purpose Vitest configuration mapping @ alias to ./src.
 * @tags test, vitest, config, alias
 */
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
