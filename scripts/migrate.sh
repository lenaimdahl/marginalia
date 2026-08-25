#!/bin/sh

# Apply the database migrations to the local PostgreSQL container.
project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

docker exec -i marginalia-postgres \
  psql -U postgres -d marginalia_db \
  < "$project_root/packages/backend/migrations/001_create_books.sql"
