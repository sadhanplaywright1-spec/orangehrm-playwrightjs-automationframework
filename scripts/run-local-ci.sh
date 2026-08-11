#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p allure-results playwright-report test-results

docker compose -f docker-compose.yml up --build --abort-on-container-exit

if [ -d "allure-report" ]; then
  echo "Allure report generated at: $ROOT_DIR/allure-report"
fi
