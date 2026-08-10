pipeline {
  agent any

  environment {
    CI = 'true'
    TEST_ENV = 'qa'
    NODE_ENV = 'test'
  }

  options {
    timestamps()
    timeout(time: 60, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Checking out repository...'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Install Playwright browsers') {
      steps {
        sh 'npx playwright install --with-deps chromium'
      }
    }

    stage('Run all tests') {
      steps {
        sh 'npx playwright test --reporter=line,allure-playwright'
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
        artifacts: 'playwright-report/**, allure-report/**, test-results/**, tmp-storage.json',
        allowEmptyArchive: true,
        fingerprint: true
      )
    }

    failure {
      echo 'Build failed. Review Playwright and Allure reports.'
    }

    success {
      echo 'Build succeeded.'
    }
  }
}
