# CI/CD setup for Jenkins + Docker

This project is configured for automated Playwright execution using Jenkins and Docker.

## Files included
- Jenkinsfile: standard Jenkins pipeline for Docker-based execution
- Jenkinsfile.multibranch: multibranch pipeline for GitHub branch automation
- docker-compose.yml: local CI-style execution
- scripts/run-local-ci.sh: wrapper for local Docker pipeline execution
- scripts/notify-slack.sh: Slack notification helper

## Prerequisites
- Jenkins with Docker installed on the Jenkins agent
- GitHub plugin and GitHub Branch Source plugin for multibranch jobs
- Docker pipeline plugin or Docker available on the agent
- Slack plugin if you use the built-in `slackSend` step

## Jenkins setup
### Option 1: Single job
1. Create a Pipeline job in Jenkins.
2. Point it to this repository.
3. Use the existing Jenkinsfile.
4. Ensure the Jenkins agent has Docker access.

### Option 2: Multibranch pipeline
1. Create a Multibranch Pipeline job.
2. Add the repository URL.
3. Set the Jenkinsfile path to `Jenkinsfile.multibranch`.
4. Enable GitHub branch source scan.
5. Add GitHub hook or Jenkins webhook trigger for automatic builds.

## GitHub webhook
To trigger Jenkins from GitHub:
1. Go to GitHub repository settings.
2. Open Webhooks.
3. Add a webhook with the payload URL:
   `http://<jenkins-host>/github-webhook/`
4. Set content type to `application/json`.
5. Select `Push` events only or all events as needed.

## Slack notifications
Set the Jenkins environment variables:
- `SLACK_CHANNEL`
- optionally `SLACK_WEBHOOK_URL` for shell-based script notifications

Example:
- `SLACK_CHANNEL=ci-builds`
- `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...`

## Local validation with Docker
Run:

```bash
chmod +x scripts/run-local-ci.sh
./scripts/run-local-ci.sh
```

This runs the same suite locally and generates the Allure report.

## Reports
The pipeline publishes:
- Playwright HTML report
- Allure report
- raw test results and artifacts

## Command reference
```bash
npx playwright test tests/ui tests/api --headed --reporter=line,allure-playwright
npx allure generate allure-results --clean -o allure-report
```
