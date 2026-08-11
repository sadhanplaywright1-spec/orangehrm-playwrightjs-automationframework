#!/usr/bin/env bash
set -euo pipefail

SLACK_WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}"
SLACK_CHANNEL="${SLACK_CHANNEL:-ci-builds}"
MESSAGE="${1:-Build finished}"

if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "SLACK_WEBHOOK_URL is not set. Skipping Slack notification."
  exit 0
fi

curl -s -X POST -H 'Content-type: application/json' \
  --data "{\"channel\":\"${SLACK_CHANNEL}\",\"text\":\"${MESSAGE}\"}" \
  "$SLACK_WEBHOOK_URL" >/dev/null
