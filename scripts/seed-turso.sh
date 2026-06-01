#!/usr/bin/env bash
# Helper to run the seed script against a Turso DB.
# Copy .env.turso.example -> .env.turso and fill in values first.

set -euo pipefail

ENVFILE=.env.turso
if [ -f "$ENVFILE" ]; then
  export $(grep -v '^#' $ENVFILE | xargs)
else
  echo "Create $ENVFILE from .env.turso.example and set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN"
  exit 1
fi

if [ -z "${TURSO_DATABASE_URL:-}" ] || [ -z "${TURSO_AUTH_TOKEN:-}" ]; then
  echo "TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in $ENVFILE"
  exit 1
fi

echo "Using TURSO_DATABASE_URL=$TURSO_DATABASE_URL"

echo "Running seed..."
node ./scripts/seed-payload.mjs

echo "Done."
