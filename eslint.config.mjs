import globals from 'globals';
import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: { sourceType: 'module', globals: globals.node },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },
];
