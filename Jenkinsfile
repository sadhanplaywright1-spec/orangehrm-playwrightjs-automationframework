pipeline {
  agent any

  environment {
    CI = 'true'
    TEST_ENV = 'qa'
    NODE_ENV = 'test'
    IMAGE_NAME = 'orangehrm-playwright'
    DOCKER_TAG = "${env.BUILD_NUMBER ?: 'local'}"
    EMAIL_TO = 'team@example.com'
  }

  options {
    timestamps()
    timeout(time: 75, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Running pipeline for branch: ${env.BRANCH_NAME ?: 'local'}"
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Branch classification') {
      steps {
        script {
          env.BRANCH_TYPE = (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master') ? 'mainline'
            : (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'staging') ? 'integration'
            : 'feature'
        }
        echo "Branch type: ${env.BRANCH_TYPE}"
      }
    }

    stage('UI tests') {
      steps {
        sh 'npx playwright test tests/ui --reporter=line,allure-playwright'
      }
    }

    stage('API tests') {
      when {
        anyOf {
          branch 'main'; branch 'master'; branch 'develop'; branch 'staging'
        }
      }
      steps {
        sh 'npx playwright test tests/api --reporter=line,allure-playwright'
      }
    }

    stage('Coverage report') {
      when {
        anyOf {
          branch 'main'; branch 'master'
        }
      }
      steps {
        sh 'npx playwright test tests/ui tests/api --coverage --reporter=line,allure-playwright || true'
        sh 'npx nyc report --reporter=text-summary --reporter=lcov --report-dir coverage || true'
      }
    }

    stage('Generate Allure report') {
      steps {
        sh 'npx allure generate allure-results --clean -o allure-report || true'
      }
    }
  }

  post {
    always {
      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright HTML Report'
      ])

      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'allure-report',
        reportFiles: 'index.html',
        reportName: 'Allure Report'
      ])

      archiveArtifacts(
        artifacts: 'playwright-report/**, allure-report/**, coverage/**, allure-results/**, test-results/**, tmp-storage.json',
        allowEmptyArchive: true,
        fingerprint: true
      )
    }

    success {
      echo 'Build succeeded.'
      mail to: env.EMAIL_TO,
        subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        body: "Pipeline completed successfully for branch ${env.BRANCH_NAME ?: 'local'}\nAllure report is available from the Jenkins job."
    }

    failure {
      echo 'Build failed. Review Playwright and Allure reports.'
      mail to: env.EMAIL_TO,
        subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        body: "Pipeline failed for branch ${env.BRANCH_NAME ?: 'local'}\nPlease review the Playwright and Allure reports."
    }
  }
}
