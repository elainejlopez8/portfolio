const pluginJs = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const react = require('eslint-plugin-react');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const typescriptEslint = tseslint;

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
