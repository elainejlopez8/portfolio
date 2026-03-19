const pluginJs = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const react = require('eslint-plugin-react');
const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
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
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
      },
      globals: globals.browser,
    },
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      import: importPlugin,
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
