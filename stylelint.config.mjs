/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: [
    'stylelint-use-nesting',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-group-selectors',
    'stylelint-no-unresolved-module', // add alias
    '@isnotdefined/stylelint-plugin',
    'stylelint-plugin-logical-css',
    '@csstools/stylelint-at-risk',
    'stylelint-media-use-custom-media',
    'stylelint-value-no-unknown-custom-properties', // half alternative to Marvin
    'stylelint-rem-over-px', //might not be needed
    // 'stylelint-order', // extended
    // '@mavrin/stylelint-declaration-use-css-custom-properties', //Need update or alternative
  ],
  rules: {
    'csstools/use-nesting': 'always',
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/stylelint-group-selectors': true,
    'plugin/no-unresolved-module': true,
    '@isnotdefined/no-disable': true,
    '@isnotdefined/no-obsolete': true,
    '@isnotdefined/unit-step': true,
    'plugin/use-logical-properties-and-values': [true, { severity: 'warning' }],
    'plugin/use-logical-units': [true, { severity: 'warning' }],
    '@csstools/stylelint-at-risk': true,
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
    'csstools/media-use-custom-media': 'known',
    'csstools/value-no-unknown-custom-properties': true,
    'rem-over-px/rem-over-px': true,
    'order/order': ['custom-properties', 'declarations', 'rules', 'at-rules'],
    'at-rule-no-unknown': [true, {ignoreAtRules: ['tailwind']} ]
  },
  ignoreDisables: true,
}
