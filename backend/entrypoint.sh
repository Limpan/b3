#!/bin/sh

set -e

# Activage virtual environment
. /app/.venv/bin/activate

# Run passed command
exec "$@"
