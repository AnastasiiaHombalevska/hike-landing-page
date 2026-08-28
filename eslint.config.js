import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },

    rules: {
      ...js.configs.recommended.rules,

      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      strict: ['error', 'never'],
    },
  },

  {
    ignores: ['dist/', 'node_modules/'],
  },
];
