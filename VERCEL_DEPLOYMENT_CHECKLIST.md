# Vercel Deployment Checklist

Use this checklist when setting up or verifying Vercel deployments for this repository.

## One-time project setup

- [ ] Create the Vercel project for this repository.
- [ ] Confirm the Vercel framework preset is `Vite`.
- [ ] Confirm the Vercel build command is `yarn build`.
- [ ] Confirm the Vercel output directory is `dist`.
- [ ] Confirm the Vercel install command is `yarn install`.
- [ ] Confirm [vercel.json](vercel.json) is present so SPA routes rewrite to `/`.

## Vercel runtime variables

- [ ] Add `GITHUB_TOKEN` to the Vercel `Preview` environment.
- [ ] Add `GITHUB_TOKEN` to the Vercel `Production` environment.
- [ ] Verify the token scope is limited to only the GitHub repository access you need.

## GitHub environment setup

- [ ] Create a GitHub environment named `preview`.
- [ ] Create a GitHub environment named `production`.
- [ ] Add required reviewers to the `production` environment.
- [ ] Confirm the repository owner is included in `production` required reviewers.

## GitHub preview secrets

- [ ] Add `VERCEL_PREVIEW_TOKEN` to the `preview` environment.
- [ ] Add `VERCEL_PREVIEW_ORG_ID` to the `preview` environment.
- [ ] Add `VERCEL_PREVIEW_PROJECT_ID` to the `preview` environment.

## GitHub production secrets

- [ ] Add `VERCEL_PRODUCTION_TOKEN` to the `production` environment.
- [ ] Add `VERCEL_PRODUCTION_ORG_ID` to the `production` environment.
- [ ] Add `VERCEL_PRODUCTION_PROJECT_ID` to the `production` environment.

## Where to get the Vercel values

- [ ] Create a Vercel token from Account Settings -> Tokens.
- [ ] Copy the org ID from the Vercel dashboard or from `.vercel/project.json` after `vercel link`.
- [ ] Copy the project ID from the Vercel dashboard or from `.vercel/project.json` after `vercel link`.
- [ ] If preview and production use the same Vercel project, reuse the same org ID and project ID with different GitHub secret names.

## Local development

- [ ] Copy `.env.local.template` to `.env.local` if needed.
- [ ] Set `GITHUB_TOKEN` in `.env.local` if you want authenticated repo data locally.
- [ ] Set `VITE_GITHUB_USERNAME` in `.env.local` if you want public repo fallback locally.
- [ ] Set `VITE_CODEPEN_USERNAME` in `.env.local` if you want CodePen content locally.
- [ ] Set `CODEPEN_API_BASE_URL` and any required `CODEPEN_API_*` auth variables if you want authenticated or private CodePen content locally.
- [ ] Run `yarn dev:vercel` when testing the frontend together with the API route.

## Verification

- [ ] Open a pull request against `main` and verify the preview workflow succeeds.
- [ ] Confirm the preview deployment can load project data through `api/github-repos`.
- [ ] Run the production workflow manually and verify the deployment summary contains a Vercel URL.
- [ ] Confirm direct navigation works for `/about-me`, `/projects`, and `/resume`.
