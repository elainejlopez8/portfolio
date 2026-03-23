# Elaine Lopez Portfolio

[![Vercel Preview Deployment](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-preview.yaml/badge.svg)](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-preview.yaml)
[![Vercel Production Deployment](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-production.yaml/badge.svg)](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-production.yaml)

Personal portfolio site built with React, TypeScript, Vite, Tailwind CSS, and Vercel.

## Tech stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- Bootstrap 5 / React Bootstrap
- Material UI
- React Router 7
- i18next / react-i18next
- React Markdown
- Vercel API Routes

## Prerequisites

- Node.js `>= 20.0.0`
- Yarn `>= 3.0.0`

> This repository is configured to use Yarn only. `npm install` is blocked by `scripts/check-yarn.js`.

## Getting started

Install dependencies and run the app with Vite:

```bash
yarn install
yarn dev
```

If you need the API route locally for the Projects page, run Vercel Dev instead:

```bash
yarn dev:vercel
```

`yarn dev:vercel` loads server-side variables from `.env.local` before starting `vercel dev`, so API routes can read `GITHUB_TOKEN` locally.

## Available scripts

- `yarn dev` - start the Vite development server
- `yarn dev:vercel` - run the site with Vercel API routes locally
- `yarn build` - type-check and create a production build
- `yarn preview` - preview the production build locally
- `yarn lint` - run Prettier check and ESLint
- `yarn lint:fix` - auto-fix formatting and lint issues where possible
- `yarn prettier` - format the codebase with Prettier

## App overview

The home route renders a landing experience that expands into the main portfolio sections:

- About Me
- Projects
- Resume

The site also exposes standalone route views for direct navigation.

## Routing

Routes are defined in `src/App.tsx`:

- `/` - home page with the progressive reveal layout
- `/about-me` - about page
- `/projects` - projects page
- `/resume` - resume overview
- `/resume/:resumeCategory` - a single resume category
- `/resume/:resumeCategory/:resumeItem` - a single resume item card

## Project structure

- `src/pages` - route-level pages such as Home, Projects, and Resume
- `src/components` - reusable UI components
- `src/components/Resume` - resume timeline and card views
- `src/services/content/default` - default portfolio copy and structured content
- `src/services/content/i18n.ts` - translation initialization and content namespaces
- `src/hooks` - shared hooks such as content access helpers
- `src/types` - shared TypeScript types
- `src/index.css` - global styles, design tokens, and layout utilities
- `api` - Vercel API routes used by the frontend

## Content management

Portfolio content is stored locally in:

- `src/services/content/default/aboutme.ts`
- `src/services/content/default/projects.ts`
- `src/services/content/default/resume.ts`
- `src/services/content/default/general.ts`

Translations are initialized in:

- `src/services/content/i18n.ts`

## Environment variables

Use `.env.local` for local development. Start from `.env.local.template`.

```env
GITHUB_TOKEN=your_github_token_here
VITE_GITHUB_USERNAME=your-github-username
```

`GITHUB_TOKEN` is server-only for the Vercel API route, so do not prefix it with `VITE_`.

- `GITHUB_TOKEN` is used by `api/github-repos.js` when you want authenticated GitHub repository data locally.
- `VITE_GITHUB_USERNAME` lets the Projects page fall back to public GitHub repositories if the authenticated API route is not available.

Do not commit `.env.local` or any real secrets.

CodePen does not provide a traditional public API for listing pens. Private pens are only possible here if `api/codepen-projects.js` talks to an authenticated upstream that you control or can access.

## GitHub repo proxy

The Projects page reads repository data through the Vercel API route in `api/github-repos.js`.

- If `GITHUB_TOKEN` is set in Vercel, the API route can return authenticated repository data, including private repos.
- If `GITHUB_TOKEN` is missing and `VITE_GITHUB_USERNAME` is set, the frontend falls back to public repos for that user.
- The API route enriches repository data with `topics` and `homepage` values before returning it to the client.

For Vercel, add `GITHUB_TOKEN` in Project Settings -> Environment Variables for both the `Preview` and `Production` environments. Use the minimum GitHub scope required for the repositories you want to expose.

## Deployment

This project is configured for Vercel.

`vercel.json` defines the SPA route rewrites for direct navigation:

- `/about-me` -> `/`
- `/projects/:path*` -> `/`
- `/resume/:path*` -> `/`

Vercel project settings:

- framework preset: Vite
- build command: `yarn build`
- output directory: `dist`
- install command: `yarn install`
- runtime environment variable in Vercel: `GITHUB_TOKEN`

GitHub Actions workflows:

- `deploy-vercel-preview.yaml` deploys pull requests targeting `main` to the Vercel Preview environment
- `deploy-vercel-production.yaml` manually deploys the latest `main` commit to the Vercel Production environment after GitHub environment approval
- `lint.yaml` runs lint checks
- `run-prettier.yaml` runs formatting checks

GitHub environment secrets:

- `preview`: `VERCEL_PREVIEW_TOKEN`, `VERCEL_PREVIEW_ORG_ID`, `VERCEL_PREVIEW_PROJECT_ID`
- `production`: `VERCEL_PRODUCTION_TOKEN`, `VERCEL_PRODUCTION_ORG_ID`, `VERCEL_PRODUCTION_PROJECT_ID`

Vercel environment variables:

- `Preview`: `GITHUB_TOKEN`
- `Production`: `GITHUB_TOKEN`

Where to get the Vercel values:

- `VERCEL_*_TOKEN`: create a token in Vercel Account Settings -> Tokens
- `VERCEL_*_ORG_ID`: copy the team or personal account ID from the Vercel dashboard or from `.vercel/project.json` after running `vercel link`
- `VERCEL_*_PROJECT_ID`: copy the project ID from the Vercel dashboard or from `.vercel/project.json` after running `vercel link`

In most cases the preview and production org/project IDs are the same because both workflows deploy the same Vercel project. The secret names are separate so the GitHub environments stay isolated.

If you want Vercel local development parity, use `yarn dev:vercel` so both the frontend and API route run together.

## Deployment flow

1. Create or link the Vercel project.
2. Add `GITHUB_TOKEN` to the Vercel `Preview` and `Production` environments.
3. Add the Vercel secrets to the `preview` and `production` GitHub environments.
4. Open a pull request against `main` to trigger the preview workflow.
5. Run the production workflow manually when you want to deploy `main`.

See `VERCEL_DEPLOYMENT_CHECKLIST.md` for a full setup and verification list.

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

Shared typography and layout tokens live in `src/index.css`.

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

- Styling combines Tailwind utilities with shared CSS tokens in `src/index.css`.
- Markdown-based rich text is rendered through `src/components/Markdown.tsx`.
- Husky, lint-staged, Commitlint, and GitHub Actions are configured for formatting and linting workflows.
