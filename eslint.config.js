const { defineConfig, globalIgnores } = require("eslint/config");

const expoConfig = require("eslint-config-expo/flat");

const simpleImportSort = require("eslint-plugin-simple-import-sort");

const unusedImports = require("eslint-plugin-unused-imports");

module.exports = defineConfig([
  expoConfig,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },

    rules: {
      // Automatically sort imports and exports
      "simple-import-sort/imports": "off",
      "simple-import-sort/exports": "off",

      // Disable overlapping unused-variable rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Remove unused imports automatically
      "unused-imports/no-unused-imports": "warn",

      // Report unused variables
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  globalIgnores(["dist/*"]),
]);
