module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    JSX: true,
    RequestInit: true,
  },
    extends: [
        'plugin:react/recommended',
        'prettier'
    ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'no-duplicate-case': 'error',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            ignoreRestSiblings: true,
          },
        ],
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
          },
        ],
        'no-warning-comments': 'warn',
        'prefer-regex-literals': 'warn',
        camelcase: 'off',
        'no-bitwise': ['error', { allow: ['<<'] }],
        'max-params': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-duplicate-imports': 'error',
        'require-await': 'error',
        'no-empty-static-block': 'off',
        'no-new-native-nonconstructor': 'off',
    },
};
