import js from "@eslint/js";
import tsPlugin from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tsPlugin.configs.recommended,
  {
    rules: {
      "max-lines": [
        "error",
        {
          "max": 150,
          "skipBlankLines": false,
          "skipComments": false
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ]
    }
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "docs/**",
      "scripts/**",
      "public/**",
      "package-lock.json",
      "firestore.rules",
      "storage.rules",
      "firestore.indexes.json",
      "next-env.d.ts"
    ]
  }
];
