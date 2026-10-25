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
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Disable overlapping unused-variable rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Remove unused imports automatically
      "unused-imports/no-unused-imports": "error",

      // Report unused variables
      "unused-imports/no-unused-vars": [
        "error",
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
