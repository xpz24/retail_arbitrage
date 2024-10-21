import globals from "globals";
import pluginJs from "@eslint/js";
import nodePlugin from "eslint-plugin-n";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    plugins: {
      nodePlugin: nodePlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Assuming browser globals are required globally
        ...globals.node, // Adding Node.js globals for general purpose
      },
      parserOptions: {
        // ecmaVersion: "latest",  // latest is default
        // sourceType: 'module', // module is default
        ecmaFeatures: {
          impliedStrict: true, // Enable support for ES modules
        },
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // General recommended rules
    },
  },
  {
    ...nodePlugin.configs["flat/recommended"],
    rules: {
      "n/exports-style": ["error", "exports"],
    },
  },
  eslintConfigPrettier,
];
