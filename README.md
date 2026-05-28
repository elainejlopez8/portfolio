# Elaine Lopez Portfolio

[![Vercel Preview Deployment](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-preview.yaml/badge.svg)](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-preview.yaml)
[![Vercel Production Deployment](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-production.yaml/badge.svg)](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-production.yaml)

Personal portfolio site built with Next.js, TypeScript, Tailwind CSS, Payload CMS, and Vercel.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Payload CMS 3 (SQLite)
- Bootstrap 5 / React Bootstrap
- Material UI
- React Markdown

## Prerequisites

- Node.js `>= 20.0.0`
- Yarn `>= 3.0.0`

> This repository is configured to use Yarn only. `npm install` is blocked by `scripts/check-yarn.js`.

## Getting started

Install dependencies and run the app:

```bash
yarn install
yarn dev
```

`yarn dev` starts the Next.js development server on port 3000 and includes the Payload CMS admin at `/cms`.

If you need Vercel API routes locally (e.g. to test the GitHub repos proxy with env vars), use:

```bash
yarn dev:vercel
```

`yarn dev:vercel` loads server-side variables from `.env.local` before starting `vercel dev`, so API routes can read `GITHUB_TOKEN` and `GITHUB_USERNAME` locally.

## Available scripts

- `yarn dev` - start the Next.js development server
- `yarn dev:vercel` - run the site with Vercel API routes locally
- `yarn build` - run Payload migrations and create a production build
- `yarn start` - start the production server
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

Routes are defined using the Next.js App Router under `src/app/(frontend)`:

- `/` - home page with the progressive reveal layout
- `/about-me` - about page
- `/projects` - projects page
- `/resume` - resume overview
- `/resume/:resumeCategory` - a single resume category
- `/resume/:resumeCategory/:resumeItem` - a single resume item card
- `/cms` - Payload CMS admin panel

## Project structure

- `src/app/(frontend)` - Next.js frontend routes
- `src/app/(payload)` - Payload CMS admin routes
- `src/app/api` - Next.js API routes used by the frontend
- `src/components` - reusable UI components
- `src/components/Resume` - resume timeline and card views
- `src/pages` - legacy page-level components (Home, AboutMe, Projects, Resume)
- `src/payload/collections` - Payload CMS collections
- `src/payload/globals` - Payload CMS globals for site content
- `src/types` - shared TypeScript types
- `src/index.css` - global styles, design tokens, and layout utilities
- `payload.config.ts` - Payload CMS configuration
- `scripts/seed-payload.ts` - one-time seed script to populate Payload globals

## Content management

Portfolio content is managed through Payload CMS globals, accessible at `/cms`:

- `general-content` - site-wide copy (name, nav links, hero text)
- `about-me-content` - about page content
- `resume-content` - resume sections and items
- `project-labels` - projects page labels

Content is fetched at request time from the Payload database via `src/components/payload-content.ts`.

### Seeding content

To populate the Payload globals with the default content on a fresh database:

```bash
yarn tsx scripts/seed-payload.ts
```

This is a one-time operation. Run it after the first deploy or when setting up a new local database.

## Environment variables

Use `.env.local` for local development. Start from `.env.local.template`.

```env
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your-github-username
VITE_GITHUB_USERNAME=your-github-username
VITE_GITHUB_USE_AUTH=true
```

`GITHUB_TOKEN` is server-only for the Next.js API route, so do not prefix it with `VITE_`.

- `GITHUB_TOKEN` is used by `api/github-repos` when you want authenticated GitHub repository data.
- `GITHUB_USERNAME` is an optional server-side fallback username used by the GitHub API route when no token is available.
- `VITE_GITHUB_USERNAME` is the client-side fallback username used by the Projects page when it retries against public repositories.
- `VITE_GITHUB_USE_AUTH=false` forces the Projects page to skip the initial authenticated API request and load public repositories directly.

Do not commit `.env.local` or any real secrets.

## GitHub repo proxy

The Projects page reads repository data through the Next.js API route at `src/app/api/github-repos/route.ts`.

- If `GITHUB_TOKEN` is set, the route requests authenticated repository data from `https://api.github.com/user/repos`.
- If `GITHUB_TOKEN` is missing, the route falls back to `GITHUB_USERNAME`, or the built-in default username, and requests public repositories.
- The route enriches repository data with `topics` and `homepage` values before returning a trimmed payload to the client.

Returned fields:

- `id`
- `name`
- `repo_url`
- `description`
- `language`
- `prod_url`
- `topics`

For Vercel, add `GITHUB_TOKEN` in Project Settings -> Environment Variables for both the `Preview` and `Production` environments.

## Client logging

The frontend forwards structured client log events to the Next.js API route at `src/app/api/log/route.ts`.

- `POST /api/log` accepts `debug`, `info`, `warn`, and `error` levels.
- The route normalizes browser metadata such as `pathname`, `timestamp`, `userAgent`, and optional `context`.
- Logs are emitted through `lib/vercel-log.js`, so browser-side issues can be inspected in Vercel runtime logs.

## Deployment

This project is configured for Vercel.

Vercel project settings:

- framework preset: Next.js
- build command: `yarn build`
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
- Optional for both: `GITHUB_USERNAME`

Where to get the Vercel values:

- `VERCEL_*_TOKEN`: create a token in Vercel Account Settings -> Tokens
- `VERCEL_*_ORG_ID`: copy the team or personal account ID from the Vercel dashboard or from `.vercel/project.json` after running `vercel link`
- `VERCEL_*_PROJECT_ID`: copy the project ID from the Vercel dashboard or from `.vercel/project.json` after running `vercel link`

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

Configured in `tsconfig.json`.

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
- `scripts/dev-vercel.mjs` loads `.env.local` before launching `vercel dev`.
- Husky, lint-staged, Commitlint, and GitHub Actions are configured for formatting and linting workflows.
