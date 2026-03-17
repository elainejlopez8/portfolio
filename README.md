# Elaine Lopez Portfolio

Personal portfolio site built with React, TypeScript, Vite, Tailwind CSS, and React Bootstrap.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Bootstrap
- React Router
- i18next / react-i18next
- React Markdown

## Prerequisites

- Node.js `>= 20.0.0`
- Yarn `>= 3.0.0`

> This repository is configured to use Yarn only. `npm install` is blocked by `scripts/check-yarn.js`.

## Getting started

```bash
yarn install
yarn dev
```

The dev server will start with Vite.

## Available scripts

- `yarn dev` — start the local development server
- `yarn build` — type-check and create a production build
- `yarn preview` — preview the production build locally
- `yarn lint` — run ESLint
- `yarn prettier` — format the codebase with Prettier

## Project structure

- `src/pages` — route-level pages such as Home, Projects, and Resume
- `src/components` — reusable UI building blocks
- `src/services/content/default` — portfolio copy and structured content
- `src/hooks` — shared hooks such as content access helpers
- `src/types` — shared TypeScript types
- `src/index.css` — global styles, design tokens, and layout utilities

## Content management

Portfolio content is currently stored locally in:

- `src/services/content/default/aboutme.ts`
- `src/services/content/default/projects.ts`
- `src/services/content/default/resume.ts`
- `src/services/content/default/general.ts`

Translations are initialized in:

- `src/services/content/i18n.ts`

## Routing

Current routes are defined in `src/App.tsx`:

- `/` — home page
- `/about-me` — about section page
- `/projects` — projects page
- `/resume` — resume page

## Import alias

The project uses the `@` alias for `src`:

```ts
import Header from '@/components/Header';
```

Configured in:

- `vite.config.ts`
- `tsconfig.app.json`
- `tsconfig.node.json`

## Design tokens

Shared typography and layout tokens live in [src/index.css](src/index.css).

Use these semantic typography classes instead of one-off text utilities:

- `type-display` for primary hero and page titles
- `type-heading` for section headings and taglines
- `type-body` for long-form copy
- `type-nav` for navigation labels
- `type-caption` for supporting metadata and footer text
- `type-icon` for icon-only links and actions
- `type-stack-*` and `type-flow*` for text rhythm between related elements

Use these layout classes so spacing scales with the same rhythm tokens:

- `layout-container` for page-width inline padding
- `layout-section` for top and bottom section spacing
- `layout-surface` for padded cards and full-width content panels
- `layout-content-inset` for nested content padding inside a section
- `layout-stack` for vertical layout gaps between major blocks
- `layout-cluster` and `layout-cluster-tight` for inline groups like navs and icon rows
- `layout-offset` and `layout-offset-tight` for spacing below headers or grouped controls

## Notes

- Styling combines Tailwind utility classes with shared CSS tokens in `src/index.css`.
- Markdown-based rich text is rendered through `src/components/Markdown.tsx`.
- Husky, lint-staged, Commitlint, and GitHub Actions are configured for formatting and linting workflows.
