# Elaine Lopez Portfolio

[![Vercel Preview Deployment](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-preview.yaml/badge.svg)](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-preview.yaml)
[![Vercel Production Deployment](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-production.yaml/badge.svg)](https://github.com/elainejlopez8/portfolio/actions/workflows/deploy-vercel-production.yaml)

Personal portfolio site built with React, TypeScript, Vite, Tailwind CSS, and Vercel.

It combines a progressive landing page, standalone route views, local content management, and Vercel API routes for GitHub data and client log forwarding.

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

`yarn dev` is enough for UI and content work. It serves the SPA only and does not run Vercel API routes.

If you need the API route locally for the Projects page, run Vercel Dev instead:

```bash
yarn dev:vercel
```

`yarn dev:vercel` loads server-side variables from `.env.local` before starting `vercel dev`, so API routes can read `GITHUB_TOKEN` and `GITHUB_USERNAME` locally.

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

The home experience can also deep-link into the expanded layout via `/#aboutMe`, and the site exposes standalone route views for direct navigation.

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

### Blob upload route

The repo also includes a Vercel Blob upload route for updating content without editing source files:

- `POST /api/content`

Required environment variables:

- `BLOB_READ_WRITE_TOKEN` - added by Vercel when a Blob store is connected to the project

Supported namespaces:

- `general`
- `aboutMe`
- `projects`
- `resume`

Request formats:

```json
{
  "namespace": "resume",
  "content": {
    "downloadResume": {
      "text": "Download Resume"
    }
  }
}
```

Or upload multiple namespaces in one request:

```json
{
  "entries": [
    {
      "namespace": "aboutMe",
      "content": {
        "title": "About Me"
      }
    },
    {
      "namespace": "resume",
      "content": {
        "tabs": {
          "education": "Education"
        }
      }
    }
  ]
}
```

Example using `curl`:

```bash
curl -X POST http://localhost:3000/api/content \
	-H "Content-Type: application/json" \
	-d '{
		"namespace": "resume",
		"content": {
			"tabs": {
				"employmentHistory": "Employment History",
				"certifications": "Certifications",
				"education": "Education"
			}
		}
	}'
```

The route writes public JSON blobs to `content/<namespace>.json` with overwrite enabled and a short cache TTL suitable for content updates.

## Environment variables

Use `.env.local` for local development. Start from `.env.local.template`.

```env
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your-github-username
VITE_GITHUB_USERNAME=your-github-username
VITE_GITHUB_USE_AUTH=true
```

`GITHUB_TOKEN` is server-only for the Vercel API route, so do not prefix it with `VITE_`.

- `GITHUB_TOKEN` is used by `api/github-repos.js` when you want authenticated GitHub repository data locally.
- `GITHUB_USERNAME` is an optional server-side fallback username used by the GitHub API route when no token is available.
- `VITE_GITHUB_USERNAME` is the client-side fallback username used by the Projects page when it retries against public repositories.
- `VITE_GITHUB_USE_AUTH=false` forces the Projects page to skip the initial authenticated API request and load public repositories directly.

Do not commit `.env.local` or any real secrets.

## GitHub repo proxy

The Projects page reads repository data through the Vercel API route in `api/github-repos.js`.

- If `GITHUB_TOKEN` is set, the API route requests authenticated repository data from `https://api.github.com/user/repos`.
- If `GITHUB_TOKEN` is missing, the API route falls back to `GITHUB_USERNAME`, or the built-in default username, and requests public repositories from `https://api.github.com/users/:username/repos`.
- The frontend retries with `VITE_GITHUB_USERNAME` if an authenticated request fails and public fallback is enabled.
- The API route enriches repository data with `topics` and `homepage` values before returning a trimmed payload to the client.

Returned fields:

- `id`
- `name`
- `repo_url`
- `description`
- `language`
- `prod_url`
- `topics`

For Vercel, add `GITHUB_TOKEN` in Project Settings -> Environment Variables for both the `Preview` and `Production` environments. Add `GITHUB_USERNAME` only if you want a configurable server-side public fallback. Use the minimum GitHub scope required for the repositories you want to expose.

## Client logging

The frontend can forward structured client log events to the Vercel API route in `api/log.js`.

- `POST /api/log` accepts `debug`, `info`, `warn`, and `error` levels.
- The route normalizes browser metadata such as `pathname`, `timestamp`, `userAgent`, and optional `context`.
- Logs are emitted through `lib/vercel-log.js`, so browser-side issues can be inspected in Vercel runtime logs.

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
- Optional for both: `GITHUB_USERNAME`

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
- `scripts/dev-vercel.mjs` loads `.env.local` before launching `vercel dev`.
- Husky, lint-staged, Commitlint, and GitHub Actions are configured for formatting and linting workflows.
