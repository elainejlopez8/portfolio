const pluginJs = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const react = require('eslint-plugin-react');
const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: [
      '*.config*',
      '**/*.d.ts',
      '**/*type*',
      '**/*types*',
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      'server/**',
    ],
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
        project: ['./tsconfig.eslint.json'],
      },
    },
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['api/**/*.js', 'scripts/**/*.js', 'vite.config.ts', 'eslint.config.cjs'],
    languageOptions: {
      globals: globals.node,
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
