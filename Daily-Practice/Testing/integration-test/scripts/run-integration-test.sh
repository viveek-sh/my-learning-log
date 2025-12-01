#!/bin/bash
set -e

docker compose up -d

echo "Waiting for DB to be online..."
./scripts/wait-for-it.sh localhost:5432 -- echo "DB is live now"

npx prisma migrate dev --name init
npm run test

docker compose down

