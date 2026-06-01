Persistence Guide — Keep Payload CMS data across deployments

Overview

The CMS writes to a database and stores uploaded files. On Vercel (and many serverless hosts) the local filesystem and local SQLite DB are ephemeral across deployments. To keep your CMS entries across deploys you must:

- Use a remote persistent database (Turso, Supabase, PlanetScale/Postgres, etc.)
- Store uploads (images/files) on remote object storage (S3, DigitalOcean Spaces, etc.)
- Optionally run a seed/import script once when provisioning a new DB
- Configure backups or provider snapshots

Quick options

1. Turso (recommended if you want SQLite-compatible API)

- Create a Turso database (https://turso.com) and note the `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` values.
- In Vercel (or your host) set environment variables `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` for Production.
- `payload.config.ts` already prefers `TURSO_DATABASE_URL` over the local `file:./dev.db` file.
- Redeploy your site — the running Payload instance will use the remote DB and your CMS entries will persist.

Optional: run your seed script once against the new DB to populate initial globals:

```bash
# from repo root
# ensure .env has VERCEL env vars or set them in your shell temporarily
# easiest: copy .env.turso.example -> .env.turso and fill values
./scripts/seed-turso.sh
```

2. Managed SQL (Postgres/MySQL)

- Provision a managed Postgres or MySQL database.
- Update `payload.config.ts` to use the appropriate adapter (e.g. `@payloadcms/db-postgres`) and set the connection URL in an env var, e.g. `DATABASE_URL`.
- Add env vars in Vercel and redeploy.

3. Persist uploads to S3-compatible storage

- Create a bucket on AWS S3, DigitalOcean Spaces, or similar.
- Add credentials to your deployment environment (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET`).
- Install and configure a Payload storage adapter that supports S3 (see Payload docs: https://payloadcms.com/docs/uploads/storage-adapters).

Example env var list (add to Vercel):

- `TURSO_DATABASE_URL` (or `DATABASE_URL` if using Postgres)
- `TURSO_AUTH_TOKEN` (if using Turso)
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET`
- `PAYLOAD_SECRET` (important; keep consistent across deploys)

Backups & Migrations

- Use your DB provider's snapshot/backups features.
- Keep `scripts/seed-payload.ts` handy to re-seed basics if you ever need to rebuild.

What I can do for you now

- Add example S3 upload adapter snippet to `payload.config.ts` (no credentials included).
- Add a `scripts/seed-payload.ts` invocation helper or small README snippet to run it.
- Help you set up Turso or generate environment-variable instructions for Vercel.

Which option do you want me to implement in the repo now? (Turso, Postgres, S3 uploads, or add README + seed helper)
