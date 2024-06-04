const globals = require('globals');
const prettier = require('./.prettierrc');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintrc = require('./.eslintrc');

module.exports = [
  ...prettier,
  {
    rules: {
      semi: ['error', 'never'],
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
  ...eslintrc,
  ...pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
];
