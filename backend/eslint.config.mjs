import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      js,
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },
    extends: ["js/recommended", "@typescript-eslint/recommended", "prettier"],
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "prettier/prettier": "error",
    },
  },
]);
