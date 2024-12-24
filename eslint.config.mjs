/* eslint-disable import-x/no-named-as-default-member */
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImportX from 'eslint-plugin-import-x'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
// import nodePlugin from 'eslint-plugin-n' // for node applications
import tseslint from 'typescript-eslint'

// typeScript (Ensure eslint applies only to typescript files)
const strictTypeChecked = tseslint.configs.strictTypeChecked.map((ruleSet) =>
  ruleSet.files === undefined
    ? { ...ruleSet, files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] }
    : ruleSet,
)
const stylisticTypeChecked = tseslint.configs.stylisticTypeChecked.map((ruleSet) =>
  ruleSet.files === undefined
    ? { ...ruleSet, files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] }
    : ruleSet,
)

// importX plugin
const importXRecommended = eslintPluginImportX.flatConfigs.recommended
const importXTypeScript = eslintPluginImportX.flatConfigs.typescript
importXRecommended.languageOptions.ecmaVersion = 'latest' // Probably not necessary

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  eslintPluginUnicorn.configs['flat/recommended'],
  importXRecommended,
  importXTypeScript,
  ...strictTypeChecked,
  ...stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.nodeBuiltin,
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // nodePlugin.configs['flat/recommended'],
  eslintConfigPrettier,
)

// const eslintMjsRules = {
//   files: ['eslint.config.mjs'],
//   rules: {
//     'n/no-unpublished-import': [
//       'error',
//       {
//         allowModules: [
//           '@eslint/js',
//           'eslint-config-prettier',
//           'typescript-eslint',
//           'eslint-plugin-n',
//           'tailwindcss',
//         ],
//       },
//     ],
//   },
// }

export default [...baseConfig]
