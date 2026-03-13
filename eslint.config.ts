import pluginJs from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
import { default as tseslint, default as typescriptEslint } from 'typescript-eslint';

export default [
  {
    ignores: ['*.config*', '**/*type*', '**/*types*', '**/dist/**', '**/build/**', '**/node_modules/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    plugins: {
      typescriptEslint,
      react,
    },
  },
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
];
