// ;
// /* eslint-disable import-x/no-named-as-default-member */
// import path from 'node:path';
// import eslint from '@eslint/js';
// import eslintConfigPrettier from 'eslint-config-prettier';
// import * as tsResolver from 'eslint-import-resolver-typescript';
// import eslintPluginImportX from 'eslint-plugin-import-x';
// import eslintPluginUnicorn from 'eslint-plugin-unicorn';
// import globals from 'globals';
// // import nodePlugin from 'eslint-plugin-n' // for node applications
// import tseslint from 'typescript-eslint';

// // typeScript
// const strictTypeChecked = tseslint.configs.strictTypeChecked.map((ruleSet) =>
//   ruleSet.files === undefined
//     ? { ...ruleSet, files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] }
//     : ruleSet,
// )
// const stylisticTypeChecked = tseslint.configs.stylisticTypeChecked.map((ruleSet) =>
//   ruleSet.files === undefined
//     ? { ...ruleSet, files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] }
//     : ruleSet,
// )

// // importX plugin
// const importXRecommended = eslintPluginImportX.flatConfigs.recommended
// const importXTypeScript = eslintPluginImportX.flatConfigs.typescript
// importXRecommended.languageOptions.ecmaVersion = 'latest'

// const baseConfig = tseslint.config(
//   eslint.configs.recommended,
//   ...strictTypeChecked,
//   ...stylisticTypeChecked,
//   importXRecommended,
//   importXTypeScript,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.builtin,
//         ...globals.nodeBuiltin,
//         ...globals.browser,
//         ...globals.node,
//       },
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   // nodePlugin.configs['flat/recommended'],
//   eslintPluginUnicorn.configs['flat/recommended'],
//   eslintConfigPrettier,
// )

// // const eslintMjsRules = {
// //   files: ['eslint.config.mjs'],
// //   rules: {
// //     'n/no-unpublished-import': [
// //       'error',
// //       {
// //         allowModules: [
// //           '@eslint/js',
// //           'eslint-config-prettier',
// //           'typescript-eslint',
// //           'eslint-plugin-n',
// //           'tailwindcss',
// //         ],
// //       },
// //     ],
// //   },
// // }

// export default [...baseConfig]

// console.log(importXTypeScript.settings['import-x/resolver'])
// importXTypeScript.settings['import-x/resolver'] = {
//   name: 'tsResolver',
//   options: {
//     alias: [
//       { '/': path.resolve(import.meta.dirname, 'public') },
//       { '@components': path.resolve(import.meta.dirname, 'public') },
//     ],
//   },
//   resolver: tsResolver,
// }
// console.log(importXTypeScript.settings['import-x/resolver'].options)

// import orderR from 'stylelint-config-recess-order'

// // console.dir(orderS.rules['order/properties-order'], { depth: null })
// // console.dir(orderI.rules['order/properties-order'], { depth: null })
// console.dir(orderR.rules['order/properties-order'], { depth: undefined })

// import browserslist from 'browserslist'

// const targets = browserslist().filter((browser, index, array) => {
//   if (browser === array.at(-1)) {
//     return true
//   }

//   for (const char of browser) {
//     if (!Number.isNaN(Number.parseInt(char))) {
//       return browser.slice(0, browser.indexOf(char)) ===
//         array[index + 1].slice(0, browser.indexOf(char))
//         ? false
//         : true
//     }
//   }
// })

// import browserslist from 'browserslist'
// import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'

// const targets = resolveToEsbuildTarget(browserslist(), {printUnknownTargets: false})
// console.log(targets)

// 'defaults and fully supports es6-module', 'maintained node versions'

import markToHtml from './src/scripts/utils/markdown-to-html.ts'

console.log(await markToHtml('/another-awesome-movie.md'))

// import resolvePathAlias from "src/scripts/utils/node-path-alias";

// console.log(await resolvePathAlias('./src/images/typescript.svg'))
