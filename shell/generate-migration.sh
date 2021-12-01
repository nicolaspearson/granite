#!/bin/sh
set -u

# Yarn workspace name
workspace=$1;
# Database schema name
schema=$2;
# Migration file name
filename=$3;

export TYPEORM_CONNECTION="${TYPEORM_CONNECTION:-postgres}"
export TYPEORM_DATABASE="${TYPEORM_DATABASE:-granite}"
export TYPEORM_HOST="${TYPEORM_HOST:-localhost}"
export TYPEORM_PASSWORD="${TYPEORM_PASSWORD:-masterkey}"
export TYPEORM_PORT="${TYPEORM_PORT:-5432}"
export TYPEORM_SYNCHRONIZE="${TYPEORM_SYNCHRONIZE:-false}"
export TYPEORM_USERNAME="${TYPEORM_USERNAME:-granite}"
export TYPEORM_SCHEMA="$2"
export TYPEORM_ENTITIES="${TYPEORM_ENTITIES:-dist/db/entities/*.js}"
export TYPEORM_MIGRATIONS="${TYPEORM_MIGRATIONS:-dist/db/migrations/*.js}"
export TYPEORM_MIGRATIONS_DIR="${TYPEORM_MIGRATIONS_DIR:-src/db/migrations}"
export TYPEORM_MIGRATIONS_RUN="${TYPEORM_MIGRATIONS_RUN:-true}"
export TYPEORM_DROP_SCHEMA="${TYPEORM_DROP_SCHEMA:-true}"

wait_time=10

echo "Starting database"
yarn workspace "$1" db:start
echo "Waiting $wait_time seconds for the database to start"
sleep $wait_time
echo "yarn workspace $1 db:migration:run $TYPEORM_ENTITIES"
yarn workspace "$1" db:migration:run
echo "yarn workspace $1 db:migration:generate $3"
yarn workspace "$1" db:migration:generate "$3"
